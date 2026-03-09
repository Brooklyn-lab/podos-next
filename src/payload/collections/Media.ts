import { createReadStream } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import { Readable } from 'stream'
import type { CollectionConfig, PayloadRequest } from 'payload'

const UPLOAD_DIR = 'public/media'

const MIME_MAP: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
}

async function serveSubfolderFile(req: PayloadRequest): Promise<Response> {
  const folder = req.routeParams?.folder as string
  const filename = req.routeParams?.filename as string
  if (!folder || !filename) {
    return Response.json({ errors: [{ message: 'Not found' }] }, { status: 404 })
  }

  const filePath = path.resolve(UPLOAD_DIR, folder, filename)
  // Prevent path traversal
  const resolvedBase = path.resolve(UPLOAD_DIR)
  if (!filePath.startsWith(resolvedBase)) {
    return Response.json({ errors: [{ message: 'Forbidden' }] }, { status: 403 })
  }

  try {
    const stats = await fs.stat(filePath)
    const ext = path.extname(filename).toLowerCase()
    const contentType = MIME_MAP[ext] || 'application/octet-stream'
    const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream

    return new Response(stream, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(stats.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      status: 200,
    })
  } catch {
    return Response.json({ errors: [{ message: 'Something went wrong.' }] }, { status: 500 })
  }
}

function sanitizeFolder(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_/-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/\/+/g, '/')
    .replace(/^[-/]+|[-/]+$/g, '')
}

function addFolderPrefix(value: string, folder: string): string {
  if (!folder || value.includes(`/${folder}/`) || value.startsWith(`${folder}/`)) return value
  const base = path.basename(value)
  return value.replace(base, `${folder}/${base}`)
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
  },
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: '/file/:folder/:filename',
      method: 'get',
      handler: serveSubfolderFile,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.folder) {
          data.folder = sanitizeFolder(data.folder)
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, data, context }) => {
        if (context?.skipFolderOrganization) return doc

        const folder = (data?.folder as string) || (doc.folder as string) || ''
        if (!folder) return doc

        // data has raw filenames; doc has afterRead-modified ones with prefix
        const filename = (data?.filename as string) || ''
        if (!filename) return doc

        const baseDir = path.resolve(process.cwd(), UPLOAD_DIR)
        const targetDir = path.join(baseDir, folder)

        await fs.mkdir(targetDir, { recursive: true })

        const filesToMove = new Set<string>()
        filesToMove.add(filename)

        const sizes = (data?.sizes || {}) as Record<string, { filename?: string }>
        for (const sizeData of Object.values(sizes)) {
          if (sizeData?.filename) filesToMove.add(sizeData.filename)
        }

        for (const file of filesToMove) {
          const src = path.join(baseDir, file)
          const dst = path.join(targetDir, file)
          if (src === dst) continue
          try {
            await fs.rename(src, dst)
          } catch {
            /* file may already be in place */
          }
        }

        return doc
      },
    ],
    afterRead: [
      ({ doc }) => {
        const folder = doc.folder as string
        if (!folder) return doc

        if (doc.filename) {
          doc.filename = addFolderPrefix(doc.filename, folder)
        }
        if (doc.url) {
          doc.url = addFolderPrefix(doc.url, folder)
        }
        if (doc.thumbnailURL) {
          doc.thumbnailURL = addFolderPrefix(doc.thumbnailURL as string, folder)
        }

        const sizes = doc.sizes as
          | Record<string, { filename?: string; url?: string; [key: string]: unknown }>
          | undefined
        if (sizes) {
          for (const sizeData of Object.values(sizes)) {
            if (sizeData?.filename) {
              sizeData.filename = addFolderPrefix(sizeData.filename, folder)
            }
            if (sizeData?.url) {
              sizeData.url = addFolderPrefix(sizeData.url, folder)
            }
          }
        }

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          if (!doc?.filename) return

          const baseDir = path.resolve(process.cwd(), UPLOAD_DIR)
          const folder = (doc.folder as string) || ''
          const dir = folder ? path.join(baseDir, folder) : baseDir
          const baseName = path.basename(doc.filename as string)

          const filesToDelete = new Set<string>()
          filesToDelete.add(baseName)

          const sizes = doc.sizes as Record<string, { filename?: string }> | undefined
          if (sizes) {
            for (const size of Object.values(sizes)) {
              if (size?.filename) filesToDelete.add(path.basename(size.filename))
            }
          }

          const nameBase = path.parse(baseName).name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const relatedFileRegex = new RegExp(`^${nameBase}(?:$|[.@_-])`, 'i')

          try {
            const entries = await fs.readdir(dir, { withFileTypes: true })
            for (const entry of entries) {
              if (!entry.isFile()) continue
              if (relatedFileRegex.test(entry.name)) {
                filesToDelete.add(entry.name)
              }
            }
          } catch {
            /* dir may not exist */
          }

          await Promise.all(
            [...filesToDelete].map(async (file) => {
              try {
                await fs.unlink(path.join(dir, file))
              } catch {
                /* missing — ignore */
              }
            })
          )

          if (dir !== baseDir) {
            try {
              await fs.rmdir(dir)
            } catch {
              /* not empty — ignore */
            }
          }
        } catch (error) {
          console.warn('Media cleanup skipped:', error)
        }
      },
    ],
  },
  upload: {
    staticDir: UPLOAD_DIR,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'thumbnailRetina',
        width: 800,
        height: 600,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'thumbnailPng',
        width: 400,
        height: 300,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'png', options: { quality: 90, compressionLevel: 9 } },
      },
      {
        name: 'thumbnailRetinaPng',
        width: 800,
        height: 600,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'png', options: { quality: 90, compressionLevel: 9 } },
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'cardPng',
        width: 768,
        height: 1024,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'png', options: { quality: 90, compressionLevel: 9 } },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'tabletPng',
        width: 1024,
        height: undefined,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'png', options: { quality: 90, compressionLevel: 9 } },
      },
      {
        name: 'cardRetina',
        width: 1536,
        height: 2048,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'cardRetinaPng',
        width: 1536,
        height: 2048,
        position: 'centre',
        // @ts-expect-error Payload types do not include resizeOptions yet
        resizeOptions: { withoutEnlargement: false },
        formatOptions: { format: 'png', options: { quality: 90, compressionLevel: 9 } },
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'folder',
      type: 'text',
      label: 'Folder',
      admin: {
        position: 'sidebar',
        description: 'Subfolder name (e.g. certificates, services). Leave empty for root /media/.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
  ],
}
