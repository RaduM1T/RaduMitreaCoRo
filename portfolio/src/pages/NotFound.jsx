import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-8xl font-extrabold mb-4 gradient-text"
              style={{ fontFamily: 'Mulish, sans-serif' }}
            >
              404
            </p>
            <h1
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
            >
              Page not found
            </h1>
            <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
              This page doesn&apos;t exist or has been moved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/" className="btn-primary">Back to Home</Link>
              <Link to="/blog" className="btn-ghost">Browse Writing</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
