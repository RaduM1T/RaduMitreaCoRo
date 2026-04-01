import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDate } from '../lib/utils'

const API_BASE = import.meta.env.VITE_AZURE_FUNCTIONS_URL

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

// Deterministic teal hue variant from name so each avatar feels unique
function getAvatarHue(name) {
  const hues = ['#234C58', '#1a3840', '#2d6070', '#3a7a8e', '#1e4550']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return hues[Math.abs(hash) % hues.length]
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CommentCard({ comment, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--glass-border)',
        borderLeft: '3px solid var(--lunar-eclipse)',
        borderRadius: '1rem',
        boxShadow: '0 2px 12px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.88)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        gap: '1rem',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          background: getAvatarHue(comment.author),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '0.1rem',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 700,
            fontFamily: 'Figtree, sans-serif',
            letterSpacing: '0.04em',
          }}
        >
          {getInitials(comment.author)}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'Mulish, sans-serif',
              fontWeight: 700,
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
            }}
          >
            {comment.author}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              fontFamily: 'Figtree, sans-serif',
            }}
          >
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
            fontFamily: 'Figtree, sans-serif',
            margin: 0,
            wordBreak: 'break-word',
          }}
        >
          {comment.message}
        </p>
      </div>
    </motion.div>
  )
}

function CommentsSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
      {[1, 0.85, 0.7].map((w, i) => (
        <div
          key={i}
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderLeft: '3px solid var(--parchment)',
            borderRadius: '1rem',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            gap: '1rem',
          }}
        >
          <div className="skeleton" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="skeleton" style={{ height: '0.875rem', width: '8rem' }} />
            <div className="skeleton" style={{ height: '0.875rem', width: `${w * 100}%` }} />
            <div className="skeleton" style={{ height: '0.875rem', width: `${w * 80}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        marginBottom: '2.5rem',
        background: 'rgba(35,76,88,0.04)',
        border: '1px dashed rgba(35,76,88,0.20)',
        borderRadius: '1rem',
      }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: 0.4 }}>💬</div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif', margin: 0 }}>
        No comments yet — be the first to share your thoughts.
      </p>
    </motion.div>
  )
}

function FieldError({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '0.78rem',
            color: '#c0392b',
            fontFamily: 'Figtree, sans-serif',
            marginTop: '0.3rem',
            marginBottom: 0,
          }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CommentsSection({ slug }) {
  const [comments, setComments]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [form, setForm]           = useState({ author: '', email: '', message: '' })
  const [errors, setErrors]       = useState({})
  const [status, setStatus]       = useState('idle') // idle | submitting | success | error

  useEffect(() => {
    if (!slug) return
    async function fetchComments() {
      try {
        const res = await fetch(`${API_BASE}/api/GetComments?slug=${encodeURIComponent(slug)}`)
        if (res.ok) setComments(await res.json())
      } catch {
        // silent — no comments displayed on network failure
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [slug])

  function validate() {
    const errs = {}
    if (!form.author.trim()) errs.author = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('submitting')
    try {
      const res = await fetch(`${API_BASE}/api/PostComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          author: form.author.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          approved: null,
          createdAt: new Date().toISOString(),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ author: '', email: '', message: '' })
        setErrors({})
      } else {
        const data = await res.json().catch(() => ({}))
        setErrors({ submit: data.error || 'Something went wrong. Please try again.' })
        setStatus('idle')
      }
    } catch {
      setErrors({ submit: 'Unable to submit. Please check your connection.' })
      setStatus('idle')
    }
  }

  return (
    <section style={{ marginTop: '5rem' }}>
      <hr className="divider" style={{ marginBottom: '3rem' }} />

      {/* ── Section header ─────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2
          style={{
            fontFamily: 'Mulish, sans-serif',
            fontWeight: 800,
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          Discussion
        </h2>
        {!loading && comments.length > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge"
          >
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </motion.span>
        )}
      </div>

      {/* ── Comments list ──────────────────────────────────────── */}
      {loading ? (
        <CommentsSkeleton />
      ) : comments.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
          {comments.map((comment, i) => (
            <CommentCard key={comment.id} comment={comment} index={i} />
          ))}
        </div>
      )}

      {/* ── Comment form ───────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(35,76,88,0.07)',
              border: '1px solid rgba(35,76,88,0.22)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2rem',
              textAlign: 'center',
            }}
          >
            {/* Checkmark */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: 'var(--lunar-eclipse)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9.5L7 13L14.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
            <p
              style={{
                fontFamily: 'Mulish, sans-serif',
                fontWeight: 700,
                fontSize: '1.0625rem',
                color: 'var(--text-primary)',
                margin: '0 0 0.375rem',
              }}
            >
              Thanks for sharing your thoughts!
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif', margin: 0 }}>
              Your comment will appear here once it has been reviewed.
            </p>
            <button
              onClick={() => setStatus('idle')}
              style={{
                marginTop: '1.25rem',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Figtree, sans-serif',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(35,76,88,0.35)',
                textUnderlineOffset: '3px',
              }}
            >
              Leave another comment
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <h3
              style={{
                fontFamily: 'Mulish, sans-serif',
                fontWeight: 700,
                fontSize: '1.0625rem',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              Leave a Comment
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name + Email row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="comment-author"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      fontFamily: 'Figtree, sans-serif',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.375rem',
                      letterSpacing: '0.01em',
                    }}
                  >
                    Name <span style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <input
                    id="comment-author"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    className="form-input"
                    style={errors.author ? { borderColor: 'rgba(192,57,43,0.5)' } : {}}
                  />
                  <FieldError message={errors.author} />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="comment-email"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      fontFamily: 'Figtree, sans-serif',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.375rem',
                      letterSpacing: '0.01em',
                    }}
                  >
                    Email <span style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <input
                    id="comment-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="form-input"
                    style={errors.email ? { borderColor: 'rgba(192,57,43,0.5)' } : {}}
                  />
                  <FieldError message={errors.email} />
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif', marginTop: '0.3rem', marginBottom: 0 }}>
                    Not displayed publicly.
                  </p>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="comment-message"
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    fontFamily: 'Figtree, sans-serif',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.375rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  Message <span style={{ color: '#c0392b' }}>*</span>
                </label>
                <textarea
                  id="comment-message"
                  rows={4}
                  placeholder="Share your thoughts, questions, or feedback…"
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="form-input"
                  style={{
                    resize: 'vertical',
                    minHeight: '7rem',
                    ...(errors.message ? { borderColor: 'rgba(192,57,43,0.5)' } : {}),
                  }}
                />
                <FieldError message={errors.message} />
              </div>

              {/* Submit error */}
              <AnimatePresence>
                {errors.submit && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontSize: '0.85rem',
                      color: '#c0392b',
                      fontFamily: 'Figtree, sans-serif',
                      marginBottom: '1rem',
                      padding: '0.625rem 0.875rem',
                      background: 'rgba(192,57,43,0.07)',
                      border: '1px solid rgba(192,57,43,0.18)',
                      borderRadius: '0.5rem',
                    }}
                  >
                    {errors.submit}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary"
                  style={status === 'submitting' ? { opacity: 0.65, cursor: 'not-allowed', transform: 'none' } : {}}
                >
                  {status === 'submitting' ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'spin 0.7s linear infinite' }}>
                        <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
                        <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Post Comment
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif', margin: 0 }}>
                  Comments are reviewed before being published.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
