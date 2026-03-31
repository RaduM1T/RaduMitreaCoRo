import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/about',   label: 'About'   },
  { to: '/blog',    label: 'Thoughts' },
  { to: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change via link click
  const closeMenu = () => setMobileOpen(false)

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? 'glass-nav-opaque' : 'glass-nav'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/" className="relative flex items-center group" onClick={closeMenu}>
            <img
              src="/logoFullColor.svg"
              alt="Radu Mitrea"
              className="h-12 w-auto transition-opacity duration-200 group-hover:opacity-0"
            />
            <img
              src="/logoFullCoverHover.svg"
              alt=""
              aria-hidden="true"
              className="h-12 w-auto absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link to="/contact" className="btn-primary text-sm">
              Get in Touch
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors hover:bg-black/5"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="block w-5 h-0.5 bg-current rounded-full origin-center"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: 'var(--inkwell)' }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-current rounded-full"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{ color: 'var(--inkwell)' }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-current rounded-full origin-center"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: 'var(--inkwell)' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="section-container pb-6 flex flex-col gap-1"
              style={{ borderTop: '1px solid var(--glass-border)' }}
            >
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block py-3 px-2 rounded-lg font-medium text-base transition-colors ${
                        isActive
                          ? 'bg-[rgba(35,76,88,0.10)]'
                          : 'hover:bg-[rgba(35,76,88,0.05)]'
                      }`
                    }
                    style={{ color: 'var(--inkwell)', fontFamily: 'Figtree, sans-serif' }}
                    onClick={closeMenu}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.1, duration: 0.3 }}
                className="mt-2"
              >
                <Link to="/contact" className="btn-primary w-full justify-center" onClick={closeMenu}>
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
