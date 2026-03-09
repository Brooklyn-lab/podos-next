import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Services } from './src/payload/collections/Services.ts'
import { Certificates } from './src/payload/collections/Certificates.ts'
import { Media } from './src/payload/collections/Media.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname, './src/payload'),
    },
    components: {
      views: {
        BulkUpload: {
          Component: './components/BulkUpload#BulkUploadView',
          path: '/bulk-upload',
        },
      },
      afterNavLinks: ['./components/BulkUploadNavLink#BulkUploadNavLink'],
    },
  },

  routes: {
    api: '/api',
    admin: '/admin',
    graphQL: '/api/graphql',
    graphQLPlayground: '/api/graphql-playground',
  },

  collections: [
    Services,
    Certificates,
    Media,
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
  ],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, './src/payload/payload-types.ts'),
  },

  secret: (() => {
    const secret = process.env.PAYLOAD_SECRET
    if (!secret) throw new Error('PAYLOAD_SECRET env variable is required')
    return secret
  })(),
})
