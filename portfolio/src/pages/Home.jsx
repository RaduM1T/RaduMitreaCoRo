import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOCK_POSTS, MOCK_FEATURED } from '../data/mockPosts'
import ArticleCard from '../components/ArticleCard'
import PageTransition from '../components/PageTransition'
import FeaturedPost from '../components/FeaturedPost'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Home() {
  return (
    <PageTransition>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">

            <motion.div {...fadeUp(0.1)} className="mb-6">
              <span className="badge">Writing &amp; Thoughts</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Ideas worth{' '}
              <span className="gradient-text-warm">writing</span>
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>about.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Thoughts on Microsoft Dynamics 365, Power Platform, digital transformation,
              and building things that matter. Written by Radu Mitrea.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-4">
              <Link to="/blog" className="btn-primary text-sm px-6 py-3">
                Read the Blog
              </Link>
              <Link to="/about" className="btn-ghost text-sm px-6 py-3">
                About Me
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
            >
              Scroll
            </span>
            <motion.div
              className="w-px h-10"
              style={{ background: 'linear-gradient(to bottom, var(--text-tertiary), transparent)' }}
              animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Featured Post ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1" style={{ background: 'var(--glass-border)' }} />
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
              >
                Featured
              </span>
              <div className="h-px flex-1" style={{ background: 'var(--glass-border)' }} />
            </div>
            <FeaturedPost post={MOCK_FEATURED} loading={false} />
          </motion.div>
        </div>
      </section>

      {/* ── Latest Articles ──────────────────────────────────────── */}
      <section className="py-16 pb-24">
        <div className="section-container">
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-2"
                style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
              >
                Latest
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Recent Writing
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
            >
              View all
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_POSTS.map((post, i) => (
              <ArticleCard key={post._id} post={post} index={i} />
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-8">
            <Link to="/blog" className="btn-ghost text-sm">View all articles</Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="py-16 pb-24">
        <div className="section-container">
          <motion.div
            className="glass-card overflow-hidden relative text-center px-8 py-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,180,216,0.12), transparent)',
              }}
            />
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-4 relative"
              style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
            >
              Let&apos;s Connect
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 relative"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
            >
              Have something in mind?
            </h2>
            <p
              className="text-base mb-8 max-w-md mx-auto relative"
              style={{ color: 'var(--text-secondary)' }}
            >
              Whether it&apos;s a project, collaboration, or just a conversation —
              I&apos;d love to hear from you.
            </p>
            <div className="relative flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary px-8 py-3">Get in Touch</Link>
              <Link to="/about" className="btn-ghost px-8 py-3">Learn About Me</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  )
}
