import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

const revalidatePages = () => {
  revalidatePath('/pl', 'page')
  revalidatePath('/ua', 'page')
  console.log(`[revalidate] Pages /pl and /ua revalidated`)
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePages()
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePages()
  return doc
}
