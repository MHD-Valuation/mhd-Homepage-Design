import { revalidateTag } from 'next/cache'

/**
 * Revalidates cache tags when CMS data is modified.
 */
export function revalidateCacheTag(tag: string) {
  try {
    revalidateTag(tag)
  } catch (err) {
    // Graceful catch for environments outside Next.js request lifecycle
  }
}
