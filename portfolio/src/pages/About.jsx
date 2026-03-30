import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ProfileCard from '../components/ProfileCard'

const SKILLS = [
  {
    category: 'Microsoft Platform',
    items: ['Dynamics 365', 'Power Platform', 'Power Apps', 'Power Automate', 'SharePoint'],
  },
  {
    category: 'Solution Design',
    items: ['Solution Architecture', 'CRM Implementation', 'Digital Transformation', 'Marketing Automation'],
  },
  {
    category: 'Web & Dev',
    items: ['HTML / CSS / JS', 'React', 'WordPress', 'UI/UX Design', 'C#'],
  },
  {
    category: 'Consulting',
    items: ['Client Advisory', 'Requirements Analysis', 'Stakeholder Management', 'Mentoring'],
  },
]

const TIMELINE = [
  {
    year: 'Mar 2025 – Present',
    title: 'Senior Technology Consultant',
    company: 'BearingPoint',
    location: 'Bucharest, Romania',
    description:
      'Leading digital transformation initiatives and delivering enterprise-grade Microsoft Power Platform solutions for international clients. Translating complex technical requirements into actionable strategies.',
  },
  {
    year: 'Feb 2024 – Mar 2025',
    title: 'Technology Consultant',
    company: 'BearingPoint',
    location: 'Bucharest, Romania',
    description:
      'Designed and implemented end-to-end Microsoft Dynamics 365 solutions. Responsible for solution architecture, mentoring junior consultants, and delivering customer experience platforms.',
  },
  {
    year: 'May 2021 – Jan 2024',
    title: 'Microsoft Dynamics Technical Consultant',
    company: 'LINKSOFT',
    location: 'Romania',
    description:
      'Configured and deployed Dynamics 365 CRM solutions, conducted system assessments, and built Customer Experience Platforms. Also led marketing strategy and automation efforts.',
  },
  {
    year: 'Aug 2017 – Jan 2019',
    title: 'SharePoint Developer',
    company: 'Stadler & Partners',
    location: 'Romania',
    description:
      'Developed custom SharePoint solutions using C# and Power Apps, with process automation via Nintex and Power Automate.',
  },
  {
    year: 'May 2017 – Sep 2024',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Romania',
    description:
      'Delivered UI/UX design and web development projects for small businesses using HTML, CSS, JavaScript, and WordPress.',
  },
]

const CERTIFICATIONS = [
  {
    title:      'Dynamics 365 Customer Experience Analyst Associate',
    shortTitle: 'Customer Experience',
    product:    'Dynamics 365',
    issuer:     'Microsoft',
    date:       'Nov 2024',
    level:      'Associate',
  },
  {
    title:      'Power Platform Solution Architect Expert',
    shortTitle: 'Solution Architect',
    product:    'Power Platform',
    issuer:     'Microsoft',
    date:       'Aug 2023',
    level:      'Expert',
  },
  {
    title:      'Dynamics 365 Sales Functional Consultant Associate',
    shortTitle: 'Sales Consultant',
    product:    'Dynamics 365',
    issuer:     'Microsoft',
    date:       'Sep 2022',
    level:      'Associate',
  },
  {
    title:      'Power Platform Functional Consultant Associate',
    shortTitle: 'Functional Consultant',
    product:    'Power Platform',
    issuer:     'Microsoft',
    date:       'Sep 2022',
    level:      'Associate',
  },
]

const MsLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 21 21" fill="none">
    <rect x="0"  y="0"  width="10" height="10" fill="#f25022"/>
    <rect x="11" y="0"  width="10" height="10" fill="#7fba00"/>
    <rect x="0"  y="11" width="10" height="10" fill="#00a4ef"/>
    <rect x="11" y="11" width="10" height="10" fill="#ffb900"/>
  </svg>
)

function CertCard({ cert, index }) {
  const [flipped, setFlipped] = useState(false)
  const isExpert = cert.level === 'Expert'

  const levelStyle = isExpert
    ? { background: 'rgba(35,76,88,0.14)', color: 'var(--accent)', border: '1px solid rgba(35,76,88,0.22)' }
    : { background: 'rgba(127,140,148,0.12)', color: 'var(--steel)', border: '1px solid rgba(127,140,148,0.22)' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px', height: '220px' }}
      onClick={() => setFlipped(f => !f)}
      className="cursor-pointer select-none"
    >
      {/* Flipper */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── Front ── */}
        <div
          className="glass-card absolute inset-0 flex flex-col justify-between p-5"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top row: logo + level */}
          <div className="flex items-start justify-between">
            <MsLogo size={22} />
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ fontFamily: 'Figtree, sans-serif', ...levelStyle }}
            >
              {cert.level}
            </span>
          </div>

          {/* Centre: product family */}
          <div>
            <p
              className="text-[10px] uppercase tracking-widest mb-1 font-semibold"
              style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
            >
              {cert.product}
            </p>
            <h3
              className="text-base font-bold leading-snug"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
            >
              {cert.shortTitle}
            </h3>
          </div>

          {/* Bottom: flip hint */}
          <div className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
              <path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8zm6-2v4m0-4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}>
              Tap for details
            </span>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-5 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(35,76,88,0.14)',
            border: '1px solid rgba(35,76,88,0.22)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            boxShadow: '0 4px 24px rgba(15,21,22,0.09), inset 0 1.5px 0 rgba(255,255,255,0.80)',
          }}
        >
          {/* Top: level badge + logo */}
          <div className="flex items-start justify-between">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ fontFamily: 'Figtree, sans-serif', ...levelStyle }}
            >
              {cert.level}
            </span>
            <MsLogo size={16} />
          </div>

          {/* Full title */}
          <p
            className="text-sm font-bold leading-snug"
            style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
          >
            {cert.title}
          </p>

          {/* Issuer + date */}
          <p
            className="text-xs"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
          >
            {cert.issuer} · {cert.date}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const fadeItem = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  const scrollRef = useRef(null)

  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="section-container">

          {/* ── Intro ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-12 xl:gap-20 mb-20">

            {/* Left — text */}
            <motion.div
              className="min-w-0 w-full lg:flex-shrink-0 lg:max-w-3xl"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              <motion.p
                variants={fadeItem}
                className="text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
              >
                About Me
              </motion.p>
              <motion.h1
                variants={fadeItem}
                className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
                style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
              >
                Crafting digital<br />
                <span className="gradient-text-warm">transformations.</span>
              </motion.h1>
              <motion.div variants={fadeItem} className="space-y-4">
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Hello there! I&apos;m Radu, a Senior Technology Consultant at BearingPoint based in Bucharest,
                  Romania. I specialise in Microsoft Dynamics 365 and Power Platform, helping
                  organisations rethink how they engage customers and automate the work that slows them down.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  My path into tech started in marketing and PR, and that background never left me.
                  I translate complex technical concepts into strategies people actually understand and use.
                  Whether architecting a CRM platform or mentoring a team, I care deeply about the
                  &quot;why&quot; behind every system.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Outside consulting, I write about technology, design, and the intersection of
                  human behaviour and digital products. This blog is where those ideas live.
                </p>
              </motion.div>
              <motion.div variants={fadeItem} className="flex flex-wrap gap-3 mt-6">
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Bucharest, Romania
                </span>
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  BearingPoint
                </span>
              </motion.div>
              <motion.div variants={fadeItem} className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" className="btn-primary">Get in Touch</Link>
                <a
                  href="https://www.linkedin.com/in/radu-mitrea/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>

            {/* Right — ProfileCard */}
            <motion.div
              className="hidden lg:flex flex-1 items-center justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProfileCard
                name="Radu Mitrea"
                title="Senior Technology Consultant"
                avatarUrl="/Me.JPG"
                showUserInfo={false}
                showDetails={false}
                enableTilt
                enableMobileTilt
                behindGlowColor="rgba(35, 76, 88, 0.50)"
                behindGlowEnabled
                innerGradient="linear-gradient(145deg, rgba(35,76,88,0.55) 0%, rgba(127,140,148,0.30) 100%)"
                onContactClick={() => window.location.href = '/contact'}
              />
            </motion.div>

          </div>

          <hr className="divider mb-20" />

          {/* ── Skills ────────────────────────────────────────────── */}
          <section className="mb-20">
            <motion.h2
              className="text-2xl font-bold mb-10"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Skills &amp; Expertise
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {SKILLS.map(({ category, items }) => (
                <motion.div key={category} variants={fadeItem} className="glass-card p-6">
                  <p
                    className="text-xs uppercase tracking-widest font-semibold mb-4"
                    style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
                  >
                    {category}
                  </p>
                  <ul className="space-y-2">
                    {items.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--accent)' }}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <hr className="divider mb-20" />

          {/* ── Experience ────────────────────────────────────────── */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <motion.h2
                className="text-2xl font-bold"
                style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Work Experience
              </motion.h2>

              {/* Scroll arrows */}
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {[
                  { dir: -1, icon: 'M10 4L6 8l4 4', label: 'Scroll left' },
                  { dir:  1, icon: 'M6 4l4 4-4 4',  label: 'Scroll right' },
                ].map(({ dir, icon, label }) => (
                  <button
                    key={dir}
                    onClick={() => scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })}
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      backdropFilter: 'blur(12px)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d={icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Track wrapper */}
            <div className="relative -mx-1">
              {/* Scroll container */}
              <div
                ref={scrollRef}
                className="overflow-x-auto no-scrollbar px-1"
                style={{ paddingTop: '16px', paddingBottom: '32px' }}
              >
                {/* Inner track — relative for line + dots */}
                <div
                  className="relative flex"
                  style={{ width: 'max-content', gap: '16px', alignItems: 'flex-start' }}
                >
                  {/* Connecting line — at vertical midpoint of 340px items */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: '170px',
                      left: '145px',
                      right: '145px',
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, var(--glass-border) 4%, var(--glass-border) 96%, transparent)',
                    }}
                  />

                  {TIMELINE.map(({ year, title, company, location }, i) => {
                    const isAbove = i % 2 === 0
                    return (
                      <motion.div
                        key={`${company}-${title}`}
                        className="relative flex-shrink-0"
                        style={{ width: '290px', height: '340px' }}
                        initial={{ opacity: 0, y: isAbove ? -28 : 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: Math.min(i * 0.08, 0.32), ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Dot — always at line Y (164px top = 170px center) */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '164px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: i === 0 ? 'var(--accent)' : 'var(--steel)',
                            border: '2.5px solid var(--bg-primary)',
                            zIndex: 1,
                            boxShadow: i === 0 ? '0 0 0 3px rgba(35,76,88,0.18)' : 'none',
                          }}
                        />

                        {/* Stem */}
                        <div
                          style={{
                            position: 'absolute',
                            top: isAbove ? '136px' : '176px',
                            left: '50%',
                            transform: 'translateX(-0.5px)',
                            width: '1px',
                            height: '28px',
                            background: 'var(--glass-border)',
                          }}
                        />

                        {/* Card */}
                        <div style={{ position: 'absolute', top: isAbove ? 0 : '204px', left: 0, right: 0 }}>
                          <div className="p-6" style={{
                            background: 'rgba(228,238,241,0.92)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 20px rgba(15,21,22,0.06)',
                          }}>
                            <div className="flex items-center justify-between mb-3">
                              <span
                                className="text-xs font-mono"
                                style={{ color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}
                              >
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              {i === 0 && (
                                <span
                                  className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                                  style={{
                                    background: 'rgba(35,76,88,0.12)',
                                    color: 'var(--accent)',
                                    border: '1px solid rgba(35,76,88,0.20)',
                                    fontFamily: 'Figtree, sans-serif',
                                  }}
                                >
                                  Current
                                </span>
                              )}
                            </div>
                            <p
                              className="text-xs mb-1.5"
                              style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
                            >
                              {year}
                              {location && <span className="ml-2 opacity-55">· {location}</span>}
                            </p>
                            <h3
                              className="text-[0.95rem] font-bold leading-snug mb-1"
                              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                            >
                              {title}
                            </h3>
                            <p
                              className="text-sm font-semibold"
                              style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
                            >
                              {company}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <hr className="divider mb-20" />

          {/* ── Certifications ────────────────────────────────────── */}
          <section className="mb-20">
            <motion.h2
              className="text-2xl font-bold mb-10"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Microsoft Certifications
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <CertCard key={cert.title} cert={cert} index={i} />
              ))}
            </div>
          </section>

          <hr className="divider mb-20" />

          {/* ── Education ─────────────────────────────────────────── */}
          <section className="mb-20">
            <motion.h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Master's */}
              <motion.div
                variants={fadeItem}
                className="glass-card p-6"
                style={{ borderLeft: '4px solid var(--accent)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p
                    className="text-base font-bold leading-snug"
                    style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                  >
                    Master&apos;s Degree
                  </p>
                  <span
                    className="text-xs flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
                  >
                    2015 – 2017
                  </span>
                </div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
                >
                  Public Relations
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
                >
                  Academia de Studii Economice, Bucharest
                </p>
              </motion.div>

              {/* Bachelor's */}
              <motion.div
                variants={fadeItem}
                className="glass-card p-6"
                style={{ borderLeft: '4px solid var(--steel)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className="text-base font-bold leading-snug"
                      style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                    >
                      Bachelor&apos;s Degree
                    </p>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(35,76,88,0.10)',
                        color: 'var(--accent)',
                        border: '1px solid rgba(35,76,88,0.18)',
                        fontFamily: 'Figtree, sans-serif',
                      }}
                    >
                      GPA 9.50
                    </span>
                  </div>
                  <span
                    className="text-xs flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
                  >
                    2012 – 2015
                  </span>
                </div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--steel)', fontFamily: 'Figtree, sans-serif' }}
                >
                  Marketing
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'Figtree, sans-serif' }}
                >
                  Academia de Studii Economice, Bucharest
                </p>
              </motion.div>
            </motion.div>
          </section>

          {/* ── CTA ────────────────────────────────────────────────── */}
          <motion.div
            className="glass-card p-10 text-center relative overflow-hidden max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 80% at 50% 120%, rgba(35,76,88,0.08), transparent)',
              }}
            />
            <h2
              className="text-2xl font-bold mb-3 relative"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
            >
              Want to chat about Power Platform?
            </h2>
            <p className="text-sm mb-6 relative" style={{ color: 'var(--text-secondary)' }}>
              I&apos;m open to collaborations, and interesting conversations.
            </p>
            <div className="relative flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">Reach Out</Link>
              <a
                href="https://www.linkedin.com/in/radu-mitrea/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  )
}
