import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    handle: 'radu-mitrea',
    href: 'https://www.linkedin.com/in/radu-mitrea/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID

  const [formData, setFormData]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status,   setStatus]     = useState('idle') // idle | submitting | success | error
  const [errors,   setErrors]     = useState({})

  function validate() {
    const e = {}
    if (!formData.name.trim())    e.name    = 'Name is required.'
    if (!formData.email.trim())   e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email.'
    if (!formData.message.trim()) e.message = 'Message is required.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length) {
      setErrors(validation)
      return
    }

    setStatus('submitting')

    if (!FORM_ID) {
      // Dev fallback: simulate success
      await new Promise((r) => setTimeout(r, 1000))
      setStatus('success')
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="section-container">

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ── Left: Info ──────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-4"
                  style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
                >
                  Contact
                </p>
                <h1
                  className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
                  style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                >
                  Let&apos;s
                  <br />
                  <span className="gradient-text-warm">talk.</span>
                </h1>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Have a project, idea, or just want to say hi?
                  I reply to every message personally.
                </p>

                {/* Email */}
                <a
                  href="mailto:hello@radumitrea.com"
                  className="flex items-center gap-3 mb-8 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(0,180,216,0.1)',
                      border: '1px solid rgba(0,180,216,0.2)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--accent)' }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <span
                    className="text-sm font-medium transition-colors group-hover:text-white"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    hello@radumitrea.com
                  </span>
                </a>

                {/* Social */}
                <div className="space-y-3">
                  {SOCIAL_LINKS.map(({ name, handle, href, icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{name}</p>
                        <p
                          className="text-sm font-medium transition-colors group-hover:text-white"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {handle}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right: Form ─────────────────────────────────────── */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {status === 'success' ? (
                <SuccessState />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="glass-card p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Field
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'Figtree, sans-serif' }}
                    >
                      Message <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me what's on your mind..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="form-input resize-none"
                      style={errors.message ? { borderColor: '#f87171' } : {}}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs" style={{ color: '#f87171' }}>{errors.message}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <p
                      className="text-sm p-3 rounded-lg"
                      style={{
                        color: '#fca5a5',
                        background: 'rgba(248,113,113,0.08)',
                        border: '1px solid rgba(248,113,113,0.2)',
                      }}
                    >
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

function Field({ label, name, type, placeholder, value, onChange, error, required }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'var(--text-secondary)', fontFamily: 'Figtree, sans-serif' }}
      >
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
        style={error ? { borderColor: '#f87171' } : {}}
      />
      {error && (
        <p className="mt-1.5 text-xs" style={{ color: '#f87171' }}>{error}</p>
      )}
    </div>
  )
}

function SuccessState() {
  return (
    <motion.div
      className="glass-card p-12 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{
          background: 'rgba(0,180,216,0.12)',
          border: '1px solid rgba(0,180,216,0.3)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
      >
        Message sent!
      </h2>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Thanks for reaching out. I&apos;ll get back to you as soon as possible.
      </p>
    </motion.div>
  )
}
