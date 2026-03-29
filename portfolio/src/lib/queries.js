// ─── Post fields fragment ────────────────────────────────────────────────
const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
  "categories": coalesce(categories[]->{
    _id,
    title,
    "slug": slug.current
  }, []),
  "author": author->{
    name,
    "slug": slug.current,
    image,
    bio
  }
`

// ─── Queries ─────────────────────────────────────────────────────────────

/** All published posts, newest first */
export const allPostsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`

/** Featured post (marked as featured, or latest if none) */
export const featuredPostQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0] {
    ${POST_FIELDS}
  }
`

/** Latest N posts */
export const latestPostsQuery = (limit = 6) => `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...${limit}] {
    ${POST_FIELDS}
  }
`

/** Single post by slug, including body */
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    body
  }
`

/** Posts in a given category */
export const postsByCategoryQuery = `
  *[_type == "post" && defined(publishedAt) && $categorySlug in categories[]->.slug.current]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`

/** Related posts (same category, excluding current) */
export const relatedPostsQuery = `
  *[
    _type == "post" &&
    defined(publishedAt) &&
    slug.current != $slug &&
    count((categories[]->._id)[@ in $categoryIds]) > 0
  ] | order(publishedAt desc) [0...3] {
    ${POST_FIELDS}
  }
`

/** All categories */
export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`

/** Slugs for static generation / prefetch */
export const allPostSlugsQuery = `
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`
