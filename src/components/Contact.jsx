import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader.jsx'
import { profile, socials } from '../data/site.js'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-24 sm:py-28">
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
      <div className="container-px relative z-10">
        <SectionHeader
          eyebrow="Contact"
          title="Ready for interviews, freelance work, and creative build-outs."
          copy={profile.availability}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="glass-strong rounded-[2rem] p-7 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-white">Let us talk about the role or project.</h3>
              <p className="mt-4 leading-8 text-slate-300">
                Send a WhatsApp message for the fastest response. I am open to junior developer
                roles, internships, website work, brand identity, social media design, and UI/UX
                projects.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-whatsapp">
                  Message on WhatsApp
                </a>
                <a href={profile.cv} download className="btn-ghost">
                  Download CV
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">Location</p>
                <p className="mt-2 font-semibold text-white">{profile.location}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">WhatsApp</p>
                <p className="mt-2 font-semibold text-white">{profile.whatsappLocal}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">Email</p>
                <a href={`mailto:${profile.email}`} className="mt-2 block font-semibold text-white hover:text-cyan">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href === '#' ? undefined : '_blank'}
                  rel={item.href === '#' ? undefined : 'noreferrer'}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan/35 hover:text-cyan"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-[2rem] p-6 sm:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-300">Name</span>
                <input
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-800/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/45"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-300">Email</span>
                <input
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-800/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/45"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-300">Project Type</span>
              <select className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-800/80 px-4 py-3 text-white outline-none transition focus:border-cyan/45">
                <option>Website Development</option>
                <option>Graphic Design</option>
                <option>Brand Identity</option>
                <option>UI/UX Design</option>
                <option>Interview / Job Opportunity</option>
              </select>
            </label>
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-300">Message</span>
              <textarea
                rows="6"
                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-ink-800/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/45"
                placeholder="Tell me what you want to build..."
              />
            </label>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-primary">
                Send via WhatsApp
              </a>
              <a href={`mailto:${profile.email}`} className="btn-ghost">
                Send Email
              </a>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              The form is styled for the portfolio UI. WhatsApp and email buttons are active for real contact.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
