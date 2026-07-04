import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks, profile } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-cream-300/60 bg-cream-50/90 shadow-soft backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <a href="#home" onClick={handleNav} className="group inline-flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-600 font-display text-lg font-bold text-white shadow-soft">
            U
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-charcoal-900">
            Uzair<span className="text-forest-500">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-forest-600/10 text-forest-600'
                    : 'text-charcoal-600 hover:bg-forest-600/5 hover:text-forest-600'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-primary py-2.5 text-xs">
            Let's Talk
          </a>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-cream-300 bg-white/80 text-charcoal-800 lg:hidden"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-charcoal-800 transition ${
                open ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-charcoal-800 transition ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-charcoal-800 transition ${
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
          className="border-t border-cream-300/60 bg-cream-50/95 px-5 pb-5 pt-3 backdrop-blur-xl lg:hidden"
        >
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNav}
                className="rounded-xl border border-cream-300/60 bg-white/60 px-4 py-3 text-sm font-semibold text-charcoal-800"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-1"
              onClick={handleNav}
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  )
}
