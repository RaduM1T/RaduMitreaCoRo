import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

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
    title: 'Dynamics 365 Customer Experience Analyst Associate',
    issuer: 'Microsoft',
    date: 'Nov 2024',
    color: 'rgba(0,180,216,0.12)',
    borderColor: 'rgba(0,180,216,0.25)',
  },
  {
    title: 'Power Platform Solution Architect Expert',
    issuer: 'Microsoft',
    date: 'Aug 2023',
    color: 'rgba(0,119,182,0.12)',
    borderColor: 'rgba(0,119,182,0.25)',
  },
  {
    title: 'Dynamics 365 Sales Functional Consultant Associate',
    issuer: 'Microsoft',
    date: 'Sep 2022',
    color: 'rgba(0,150,200,0.10)',
    borderColor: 'rgba(0,150,200,0.22)',
  },
  {
    title: 'Power Platform Functional Consultant Associate',
    issuer: 'Microsoft',
    date: 'Sep 2022',
    color: 'rgba(0,95,163,0.12)',
    borderColor: 'rgba(0,95,163,0.25)',
  },
]

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const fadeItem = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="section-container">

          {/* ── Intro ─────────────────────────────────────────────── */}
          <motion.div
            className="max-w-2xl mb-20"
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
                I&apos;m Radu Mitrea, a Senior Technology Consultant at BearingPoint based in Bucharest,
                Romania. I specialise in Microsoft Dynamics 365 and Power Platform — helping
                organisations rethink how they engage customers and automate the work that slows them down.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                My path into tech started in marketing and PR — and that background never left me.
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
            <motion.h2
              className="text-2xl font-bold mb-10"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Experience
            </motion.h2>
            <div className="relative max-w-2xl">
              <div
                className="absolute left-4 top-2 bottom-2 w-px"
                style={{ background: 'var(--glass-border)' }}
              />
              <motion.div
                className="space-y-6"
                variants={stagger}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {TIMELINE.map(({ year, title, company, location, description }) => (
                  <motion.div
                    key={`${company}-${title}`}
                    variants={fadeItem}
                    className="flex gap-8 pl-12 relative"
                  >
                    <div
                      className="absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(0,180,216,0.10)',
                        border: '1px solid rgba(0,180,216,0.25)',
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                    </div>

                    <div className="glass-card p-6 flex-1">
                      <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>
                        {year}
                        {location && (
                          <span className="ml-2 opacity-60">· {location}</span>
                        )}
                      </p>
                      <h3
                        className="text-base font-bold mb-0.5"
                        style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>
                        {company}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {CERTIFICATIONS.map(({ title, issuer, date, color, borderColor }) => (
                <motion.div
                  key={title}
                  variants={fadeItem}
                  className="flex items-start gap-4 rounded-xl p-5"
                  style={{ background: color, border: `1px solid ${borderColor}` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,180,216,0.15)', border: '1px solid rgba(0,180,216,0.3)' }}
                  >
                    {/* Microsoft logo-style icon */}
                    <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
                      <rect x="0"  y="0"  width="10" height="10" fill="#f25022"/>
                      <rect x="11" y="0"  width="10" height="10" fill="#7fba00"/>
                      <rect x="0"  y="11" width="10" height="10" fill="#00a4ef"/>
                      <rect x="11" y="11" width="10" height="10" fill="#ffb900"/>
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold leading-snug mb-1"
                      style={{ color: 'var(--text-primary)', fontFamily: 'Mulish, sans-serif' }}
                    >
                      {title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      {issuer} · {date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
              className="glass-card p-6 max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--accent)', fontFamily: 'Figtree, sans-serif' }}
              >
                Academia de Studii Economice — Bucharest
              </p>
              <div className="space-y-3 mt-3">
                <div>
                  <p className="text-sm font-bold" style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}>
                    Master&apos;s Degree — Public Relations
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>2015 – 2017</p>
                </div>
                <div
                  className="h-px"
                  style={{ background: 'var(--glass-border)' }}
                />
                <div>
                  <p className="text-sm font-bold" style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}>
                    Bachelor&apos;s Degree — Marketing
                    <span className="ml-2 text-xs font-normal" style={{ color: 'var(--accent)' }}>
                      GPA 9.50
                    </span>
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>2012 – 2015</p>
                </div>
              </div>
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
                background: 'radial-gradient(ellipse 60% 80% at 50% 120%, rgba(0,180,216,0.1), transparent)',
              }}
            />
            <h2
              className="text-2xl font-bold mb-3 relative"
              style={{ fontFamily: 'Mulish, sans-serif', color: 'var(--text-primary)' }}
            >
              Want to work together?
            </h2>
            <p className="text-sm mb-6 relative" style={{ color: 'var(--text-secondary)' }}>
              I&apos;m open to consulting engagements, collaborations, and interesting conversations.
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
