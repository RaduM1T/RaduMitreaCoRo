import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const token = import.meta.env.VITE_SANITY_TOKEN?.trim() || undefined

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  ...(token ? { token } : {}),
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

/**
 * Generic fetch helper with basic error handling.
 * Returns null on error rather than throwing, so pages can show empty states.
 */
export async function sanityFetch(query, params = {}) {
  try {
    return await client.fetch(query, params)
  } catch (err) {
    console.error('[Sanity] Fetch error:', err)
    return null
  }
}
