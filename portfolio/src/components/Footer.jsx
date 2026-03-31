import { Link } from 'react-router-dom'

const LINKS = {
  Nav: [
    { to: '/',        label: 'Home'    },
    { to: '/blog',    label: 'Thoughts' },
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
      style={{
        borderTop: '1px solid var(--glass-border)',
        background: 'linear-gradient(to top, var(--bg-tertiary), transparent)',
      }}
    >
      <div className="section-container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="relative inline-flex mb-4 group w-fit">
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
                        className="text-sm transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.target.style.color = 'var(--inkwell)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.target.style.color = 'var(--inkwell)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
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
            Built with React &amp; <a href='https://www.sanity.io/' target ='_blank'>Sanity</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
