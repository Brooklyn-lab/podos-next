import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

import { localeCodes } from '../locale-registry.ts'

const revalidatePages = async () => {
  try {
    const { revalidatePath } = await import('next/cache.js')
    for (const code of localeCodes) {
      revalidatePath(`/${code}`, 'page')
    }
    console.log(`[revalidate] Pages revalidated for locales: ${localeCodes.join(', ')}`)
  } catch {
    // next/cache is only available inside Next.js runtime
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePages()
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePages()
  return doc
}
