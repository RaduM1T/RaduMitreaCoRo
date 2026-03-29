import { Link } from 'react-router-dom'

const LINKS = {
  Nav: [
    { to: '/',        label: 'Home'    },
    { to: '/blog',    label: 'Writing' },
    { to: '/about',   label: 'About'   },
    { to: '/contact', label: 'Contact' },
  ],
  Social: [
    { href: 'https://www.linkedin.com/in/radu-mitrea/', label: 'LinkedIn' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative mt-24"
      style={{ borderTop: '1px solid var(--glass-border)' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
          pointerEvents: 'none',
        }}
      />
      <div className="section-container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                RM
              </div>
              <span
                className="font-semibold text-[0.9rem]"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Radu Mitrea
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              Senior Technology Consultant at BearingPoint. Writing on Microsoft tech, design, and digital transformation.
            </p>
          </div>

          {/* Nav + Social links */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
              >
                {title}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    {'to' in item ? (
                      <Link
                        to={item.to}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--glass-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            &copy; {year} Radu Mitrea. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Built with React &amp; Sanity
          </p>
        </div>
      </div>
    </footer>
  )
}
