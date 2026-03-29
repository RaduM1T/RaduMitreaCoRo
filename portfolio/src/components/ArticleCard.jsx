import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { urlFor } from '../lib/sanity'
import { formatDate, readingTimeLabel } from '../lib/utils'

export default function ArticleCard({ post, index = 0 }) {
  const {
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    gradient,
    estimatedReadingTime,
    categories = [],
    author,
  } = post

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/blog/${slug}`}
        className="glass-card block overflow-hidden group h-full"
        aria-label={`Read article: ${title}`}
      >
        {/* Cover image / gradient */}
        {(mainImage || gradient) && (
          <div className="relative h-48 overflow-hidden rounded-t-xl -mx-px -mt-px">
            {mainImage ? (
              <img
                src={urlFor(mainImage).width(800).height(400).auto('format').url()}
                alt={mainImage.alt || title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                style={{ background: gradient }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(4,8,26,0.8) 0%, transparent 60%)',
              }}
            />
          </div>
        )}

        <div className="p-6">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.slice(0, 2).map((cat) => (
                <span key={cat._id} className="badge text-xs">
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className="text-lg font-bold leading-snug mb-3 transition-colors group-hover:text-white"
            style={{
              fontFamily: 'Mulish, sans-serif',
              color: 'var(--text-primary)',
            }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p
              className="text-sm leading-relaxed mb-4 line-clamp-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {excerpt}
            </p>
          )}

          {/* Footer meta */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2.5">
              {author?.image && (
                <img
                  src={urlFor(author.image).width(48).height(48).auto('format').url()}
                  alt={author.name}
                  className="w-7 h-7 rounded-full object-cover"
                  style={{ border: '1px solid var(--glass-border)' }}
                />
              )}
              <div>
                {author?.name && (
                  <p
                    className="text-xs font-medium leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {author.name}
                  </p>
                )}
                {publishedAt && (
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {formatDate(publishedAt)}
                  </p>
                )}
              </div>
            </div>

            {estimatedReadingTime > 0 && (
              <span
                className="text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {readingTimeLabel(estimatedReadingTime)}
              </span>
            )}
          </div>
        </div>

        {/* Hover accent line */}
        <div
          className="h-px transition-all duration-300 group-hover:opacity-100 opacity-0"
          style={{
            background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
          }}
        />
      </Link>
    </motion.article>
  )
}
