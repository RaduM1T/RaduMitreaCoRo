import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sanityFetch } from '../lib/sanity'
import { allPostsQuery, allCategoriesQuery, postsByCategoryQuery } from '../lib/queries'
import { MOCK_POSTS } from '../data/mockPosts'
import ArticleCard from '../components/ArticleCard'
import PageTransition from '../components/PageTransition'

const IS_SANITY_CONFIGURED = !!import.meta.env.VITE_SANITY_PROJECT_ID

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts,      setPosts]      = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)

  const activeCategory = searchParams.get('category') || 'all'

  useEffect(() => {
    if (!IS_SANITY_CONFIGURED) {
      // Derive mock categories from posts
      const cats = Object.values(
        MOCK_POSTS.flatMap((p) => p.categories).reduce((acc, c) => {
          acc[c._id] = c
          return acc
        }, {})
      )
      setCategories(cats)
      return
    }
    sanityFetch(allCategoriesQuery).then((cats) => setCategories(cats ?? []))
  }, [])

  useEffect(() => {
    if (!IS_SANITY_CONFIGURED) {
      const filtered =
        activeCategory === 'all'
          ? MOCK_POSTS
          : MOCK_POSTS.filter((p) => p.categories.some((c) => c.slug === activeCategory))
      setPosts(filtered)
      setLoading(false)
      return
    }

    setLoading(true)
    const query =
      activeCategory === 'all'
        ? allPostsQuery
        : postsByCategoryQuery
    const params =
      activeCategory === 'all'
        ? {}
        : { categorySlug: activeCategory }

    sanityFetch(query, params).then((data) => {
      setPosts(data ?? [])
      setLoading(false)
    })
  }, [activeCategory])

  function handleCategory(slug) {
    if (slug === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: slug })
    }
  }

  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="section-container">

          {/* Header */}
          <motion.div
            className="mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-3"
              style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
            >
              Writing
            </p>
            <h1
              className="text-4xl sm:text-5xl font-extrabold mb-4"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
            >
              All Articles
            </h1>
            <p
              className="text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Thoughts on technology, design, and building things that matter.
            </p>
          </motion.div>

          {/* Category filter */}
          {categories.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <button
                onClick={() => handleCategory('all')}
                className={`badge cursor-pointer transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[rgba(0,180,216,0.25)] border-[rgba(0,180,216,0.5)]'
                    : ''
                }`}
                style={activeCategory === 'all' ? { color: '#22d3ee' } : {}}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategory(cat.slug)}
                  className={`badge cursor-pointer transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-[rgba(0,180,216,0.25)] border-[rgba(0,180,216,0.5)]'
                      : ''
                  }`}
                  style={activeCategory === cat.slug ? { color: '#22d3ee' } : {}}
                >
                  {cat.title}
                </button>
              ))}
            </motion.div>
          )}

          {/* Post count */}
          {!loading && (
            <motion.p
              className="text-sm mb-8"
              style={{ color: 'var(--text-tertiary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {posts.length === 0
                ? 'No articles found'
                : `${posts.length} article${posts.length !== 1 ? 's' : ''}`}
            </motion.p>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <ArticleCard key={post._id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-16 text-center">
              <div className="text-4xl mb-4">📭</div>
              <p
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                No articles found
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {activeCategory !== 'all'
                  ? 'No articles in this category yet.'
                  : 'Check back soon — writing is on its way.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-48 rounded-t-xl" />
      <div className="p-6 space-y-3">
        <div className="skeleton h-4 w-20 rounded-full" />
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="skeleton w-7 h-7 rounded-full" />
            <div className="space-y-1">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-3 w-14" />
            </div>
          </div>
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
    </div>
  )
}
