import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sanityFetch } from '../lib/sanity'
import { featuredPostQuery, latestPostsQuery } from '../lib/queries'
import ArticleCard from '../components/ArticleCard'
import PageTransition from '../components/PageTransition'
import FeaturedPost from '../components/FeaturedPost'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

function HeroGraphic() {
  return (
    <div className="relative w-[480px] h-[480px]" aria-hidden="true">
      <svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* Slow-rotating dashed outer ring */}
        <motion.circle
          cx="240" cy="240" r="210"
          stroke="rgba(127,140,148,0.22)"
          strokeWidth="1"
          strokeDasharray="3 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '240px 240px' }}
        />

        {/* Counter-rotating medium dashed ring */}
        <motion.circle
          cx="240" cy="240" r="148"
          stroke="rgba(35,76,88,0.16)"
          strokeWidth="1"
          strokeDasharray="2 8"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '240px 240px' }}
        />

        {/* Large teal filled circle — floats up-left */}
        <motion.circle
          cx="168" cy="178" r="132"
          fill="rgba(35,76,88,0.09)"
          stroke="rgba(35,76,88,0.18)"
          strokeWidth="1"
          animate={{ cy: [178, 158, 178], cx: [168, 182, 168] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />

        {/* Medium taupe circle — floats down-right */}
        <motion.circle
          cx="312" cy="308" r="92"
          fill="rgba(94,82,75,0.09)"
          stroke="rgba(94,82,75,0.20)"
          strokeWidth="1"
          animate={{ cy: [308, 324, 308], cx: [312, 296, 312] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />

        {/* Small parchment ring — floats top-right */}
        <motion.circle
          cx="348" cy="112" r="66"
          stroke="rgba(201,194,194,0.70)"
          strokeWidth="2"
          fill="rgba(201,194,194,0.07)"
          animate={{ cy: [112, 96, 112], cx: [348, 362, 348] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />

        {/* Small steel ring — floats bottom-left */}
        <motion.circle
          cx="100" cy="340" r="44"
          stroke="rgba(127,140,148,0.45)"
          strokeWidth="1.5"
          fill="rgba(127,140,148,0.06)"
          animate={{ cy: [340, 356, 340], cx: [100, 88, 100] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 1 }}
        />

        {/* Central glass orb — breathes */}
        <motion.circle
          cx="240" cy="240" r="44"
          fill="rgba(228,238,241,0.60)"
          stroke="rgba(35,76,88,0.24)"
          strokeWidth="1.5"
          animate={{ r: [44, 50, 44], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />
        {/* Central orb inner highlight */}
        <motion.circle
          cx="233" cy="233" r="18"
          fill="rgba(255,255,255,0.45)"
          animate={{ r: [18, 21, 18], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />

        {/* Accent dots */}
        <motion.circle
          cx="72" cy="188" r="11"
          fill="rgba(35,76,88,0.42)"
          animate={{ cy: [188, 176, 188] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />
        <motion.circle
          cx="390" cy="210" r="7"
          fill="rgba(94,82,75,0.48)"
          animate={{ cy: [210, 222, 210] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 1.5 }}
        />
        <motion.circle
          cx="155" cy="400" r="5"
          fill="rgba(127,140,148,0.55)"
          animate={{ cx: [155, 165, 155] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 0.8 }}
        />
        <circle cx="415" cy="368" r="10" fill="rgba(201,194,194,0.80)" stroke="rgba(127,140,148,0.30)" strokeWidth="1" />
        <circle cx="54" cy="118" r="5" fill="rgba(127,140,148,0.32)" />
        <circle cx="428" cy="132" r="4" fill="rgba(35,76,88,0.28)" />
        <circle cx="290" cy="430" r="6" fill="rgba(94,82,75,0.30)" />

      </svg>
    </div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState(undefined)
  const [posts,    setPosts]    = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function load() {
      const [feat, latest] = await Promise.all([
        sanityFetch(featuredPostQuery),
        sanityFetch(latestPostsQuery(6)),
      ])
      setFeatured(feat ?? null)
      setPosts(latest ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <PageTransition>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        <div className="section-container">
          <div className="flex items-center gap-8 xl:gap-16">

            {/* Left — text */}
            <div className="flex-1 min-w-0">

              <motion.div {...fadeUp(0.1)} className="mb-6">
                <span className="badge">Writing &amp; Thoughts</span>
              </motion.div>

              <motion.h1
                {...fadeUp(0.2)}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
                style={{ fontFamily: 'Mulish, sans-serif' }}
              >
                Ideas worth{' '}
                <span className="gradient-text-warm">writing</span>
                <br />
                <span style={{ color: 'var(--lunar-eclipse)' }}>about.</span>
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

            {/* Right — geometric composition */}
            <motion.div
              className="hidden lg:block flex-shrink-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroGraphic />
            </motion.div>

          </div>
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
            <FeaturedPost post={featured} loading={loading} />
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
                style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
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
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : posts.map((post, i) => <ArticleCard key={post._id} post={post} index={i} />)
            }
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
                background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(35,76,88,0.08), transparent)',
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
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
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

function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-48 rounded-t-xl" />
      <div className="p-6 space-y-3">
        <div className="skeleton h-4 w-20 rounded-full" />
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>
    </div>
  )
}
