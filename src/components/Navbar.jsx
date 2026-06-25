import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks, profile } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNav = () => setOpen(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink-900/70 backdrop-blur-2xl"
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <a href="#home" onClick={handleNav} className="group inline-flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 font-display text-lg font-bold text-cyan shadow-glow">
            U
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-white">
            Uzair<span className="text-cyan">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-white/10 text-cyan shadow-[inset_0_0_0_1px_rgba(34,211,238,0.25)]'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-whatsapp py-2.5">
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/5 text-white lg:hidden"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-white transition ${
                open ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-white transition ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-white transition ${
                open ? 'top-2 -rotate-45' : 'top-4'
              }`}
            />
          </span>
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-ink-900/95 px-5 pb-5 pt-3 backdrop-blur-2xl lg:hidden"
        >
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNav}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp mt-1"
              onClick={handleNav}
            >
              WhatsApp Me
            </a>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  )
}
