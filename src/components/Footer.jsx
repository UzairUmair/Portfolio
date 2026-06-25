import { navLinks, profile } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900 px-0 py-10">
      <div className="container-px flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold text-white">{profile.name}</p>
          <p className="mt-2 text-sm text-slate-400">
            {profile.role} / {profile.brand}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan/35 hover:text-cyan"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="text-sm text-slate-500">
          <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-cyan">
            WhatsApp
          </a>
          <span className="mx-2">/</span>
          <span>2026 Portfolio</span>
        </div>
      </div>
    </footer>
  )
}
