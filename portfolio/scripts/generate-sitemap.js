import { createClient } from '@sanity/client'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ─── Config ──────────────────────────────────────────────────────────────────

const SITE_URL = 'https://www.radumitrea.com'

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'ew4jc1go'
const SANITY_DATASET    = process.env.VITE_SANITY_DATASET    || 'production'

// ─── Static routes ───────────────────────────────────────────────────────────
// Edit priority (0.0–1.0) and changefreq to reflect how often each page changes.

const STATIC_ROUTES = [
  { path: '/',        priority: '1.0', changefreq: 'weekly'  },
  { path: '/blog',    priority: '0.9', changefreq: 'daily'   },
  { path: '/about',   priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'yearly'  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function urlEntry({ loc, priority, changefreq, lastmod = today() }) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`.trimStart()
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generate() {
  // Fetch post slugs and published dates from Sanity
  let posts = []
  try {
    const client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset:   SANITY_DATASET,
      useCdn:    true,
      apiVersion: '2024-01-01',
    })
    posts = await client.fetch(
      `*[_type == "post" && defined(slug.current) && defined(publishedAt)]
       | order(publishedAt desc) {
         "slug": slug.current,
         publishedAt
       }`
    )
  } catch (err) {
    console.warn('[sitemap] Could not fetch posts from Sanity:', err.message)
    console.warn('[sitemap] Generating sitemap with static routes only.')
  }

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changefreq }) =>
    urlEntry({ loc: `${SITE_URL}${path}`, priority, changefreq })
  )

  const postEntries = posts.map(({ slug, publishedAt }) =>
    urlEntry({
      loc:        `${SITE_URL}/blog/${slug}`,
      priority:   '0.8',
      changefreq: 'monthly',
      lastmod:    publishedAt.split('T')[0],
    })
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...postEntries].join('\n')}
</urlset>
`

  const __dirname = dirname(fileURLToPath(import.meta.url))
  const outPath   = resolve(__dirname, '../public/sitemap.xml')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, sitemap, 'utf-8')

  console.log(`[sitemap] ✓ Written to public/sitemap.xml (${staticEntries.length} static + ${postEntries.length} posts)`)
}

generate()
