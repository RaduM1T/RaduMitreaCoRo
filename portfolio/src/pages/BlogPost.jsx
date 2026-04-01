import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { sanityFetch, urlFor } from '../lib/sanity'
import { postBySlugQuery, relatedPostsQuery } from '../lib/queries'
import { formatDate, readingTimeLabel } from '../lib/utils'
import PageTransition from '../components/PageTransition'
import ArticleCard from '../components/ArticleCard'
import CommentsSection from '../components/CommentsSection'

// Custom Portable Text components for the glass aesthetic
const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(1200).auto('format').url()}
          alt={value.alt || ''}
          className="w-full rounded-2xl"
          style={{ border: '1px solid var(--glass-border)' }}
          loading="lazy"
        />
        {value.caption && (
          <figcaption
            className="text-center text-sm mt-3 italic"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post,    setPost]    = useState(undefined) // undefined = loading, null = not found
  const [related, setRelated] = useState([])

  useEffect(() => {
    async function load() {
      const data = await sanityFetch(postBySlugQuery, { slug })
      setPost(data ?? null)

      if (data?.categories?.length) {
        const categoryIds = data.categories.map((c) => c._id)
        const relatedData = await sanityFetch(relatedPostsQuery, { slug, categoryIds })
        setRelated(relatedData ?? [])
      }
    }
    load()
  }, [slug])

  if (post === null) return <Navigate to="/404" replace />

  const loading = post === undefined

  return (
    <PageTransition>
      <article className="pt-24 pb-24">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="section-container">
          <div className="max-w-3xl mx-auto">

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                style={{ color: 'var(--text-secondary)', fontFamily: 'Figtree, sans-serif' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Articles
              </Link>
            </motion.div>

            {loading ? (
              <HeaderSkeleton />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Categories */}
                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {post.categories.map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/blog?category=${cat.slug}`}
                        className="badge"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1
                  className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
                  style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                >
                  {post.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {post.author && (
                    <div className="flex items-center gap-3">
                      {post.author.image && (
                        <img
                          src={urlFor(post.author.image).width(64).height(64).auto('format').url()}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                          style={{ border: '1px solid var(--glass-border)' }}
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {post.author.name}
                        </p>
                        {post.publishedAt && (
                          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            {formatDate(post.publishedAt)}
                            {post.estimatedReadingTime > 0 &&
                              ` · ${readingTimeLabel(post.estimatedReadingTime)}`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Cover image ────────────────────────────────────────── */}
        {(loading || post?.mainImage) && (
          <div className="section-container my-10">
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="skeleton h-[420px] rounded-2xl" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={urlFor(post.mainImage).width(1600).height(840).auto('format').url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full rounded-2xl object-cover"
                    style={{
                      border: '1px solid var(--glass-border)',
                      maxHeight: '520px',
                    }}
                    loading="eager"
                  />
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ── Body ──────────────────────────────────────────────── */}
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <BodySkeleton />
            ) : post?.body ? (
              <motion.div
                className="prose-glass"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PortableText value={post.body} components={portableTextComponents} />
              </motion.div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No content available.</p>
            )}

            {/* Comments */}
            {!loading && post && (
              <CommentsSection slug={slug} />
            )}

            {/* Author bio */}
            {!loading && post?.author?.bio && (
              <motion.div
                className="glass-card p-6 mt-16 flex gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(96).height(96).auto('format').url()}
                    alt={post.author.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0 mt-1"
                    style={{ border: '1px solid var(--glass-border)' }}
                  />
                )}
                <div>
                  <p
                    className="text-sm font-semibold uppercase tracking-widest mb-1"
                    style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
                  >
                    Written by
                  </p>
                  <p
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {post.author.name}
                  </p>
                  {Array.isArray(post.author.bio) ? (
                    <div className="text-sm prose-glass">
                      <PortableText value={post.author.bio} />
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Related posts ─────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="section-container mt-20">
            <hr className="divider mb-12" />
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
            >
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ArticleCard key={p._id} post={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </article>
    </PageTransition>
  )
}

function HeaderSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-4 w-24 rounded-full" />
      <div className="skeleton h-10 w-full" />
      <div className="skeleton h-10 w-3/4" />
      <div className="flex items-center gap-3 mt-6">
        <div className="skeleton w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-32" />
          <div className="skeleton h-3 w-24" />
        </div>
      </div>
    </div>
  )
}

function BodySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={`skeleton h-4 ${i % 5 === 4 ? 'w-3/4' : 'w-full'}`} />
      ))}
      <div className="pt-4" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i + 10} className={`skeleton h-4 ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  )
}
