import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity'
import { formatDate, readingTimeLabel } from '../lib/utils'

export default function FeaturedPost({ post, loading }) {
  if (loading) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="skeleton h-72 lg:h-auto rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none" />
          <div className="p-8 lg:p-12 space-y-4">
            <div className="skeleton h-4 w-24 rounded-full" />
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-8 w-1/2" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-10 w-36 mt-4 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) return null

  const { title, slug, excerpt, publishedAt, mainImage, gradient, estimatedReadingTime, categories = [], author } = post

  return (
    <Link
      to={`/blog/${slug}`}
      className="glass-card overflow-hidden block group"
      aria-label={`Featured article: ${title}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Image */}
        {(mainImage || gradient) ? (
          <div className="relative overflow-hidden rounded-tl-xl rounded-bl-none rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl h-72 lg:h-auto">
            {mainImage ? (
              <img
                src={urlFor(mainImage).width(900).height(600).auto('format').url()}
                alt={mainImage.alt || title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            ) : (
              <div
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                style={{ background: gradient, minHeight: '18rem' }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(4,8,26,0.3) 0%, transparent 60%)',
              }}
            />
          </div>
        ) : (
          <div
            className="h-72 lg:h-auto flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,119,182,0.2), rgba(0,180,216,0.1))',
            }}
          >
            <span className="text-6xl opacity-30">✍️</span>
          </div>
        )}

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.slice(0, 2).map((cat) => (
                <span key={cat._id} className="badge">
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2
            className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4 transition-colors group-hover:text-white"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
          >
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p
              className="text-base leading-relaxed mb-6 line-clamp-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              {excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            {author && (
              <div className="flex items-center gap-2.5">
                {author.image && (
                  <img
                    src={urlFor(author.image).width(48).height(48).auto('format').url()}
                    alt={author.name}
                    className="w-8 h-8 rounded-full object-cover"
                    style={{ border: '1px solid var(--glass-border)' }}
                  />
                )}
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {author.name}
                  </p>
                  {publishedAt && (
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      {formatDate(publishedAt)}
                      {estimatedReadingTime > 0 && ` · ${readingTimeLabel(estimatedReadingTime)}`}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Read button */}
          <div className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: 'var(--accent)' }}>
            Read Article
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
