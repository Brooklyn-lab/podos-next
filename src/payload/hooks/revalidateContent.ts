import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath('/pl', 'page')
  revalidatePath('/ua', 'page')
  console.log(`[revalidate] Pages /pl and /ua revalidated`)
  return doc
}
