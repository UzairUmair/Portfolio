import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader.jsx'
import { profile, skills, timeline } from '../data/site.js'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      {/* Subtle background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-white to-cream-100" />
      <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-forest-500/5" />
      <div className="absolute -right-16 bottom-32 h-56 w-56 rounded-full bg-gold-400/8" />

      <div className="container-px relative z-10">
        <SectionHeader
          eyebrow="About"
          title="Designer thinking, developer execution."
          copy="I combine visual design skills with front-end development so a project looks strong, feels smooth, and is built with a practical structure."
          align="left"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-forest-500/10 via-gold-400/10 to-cream-300/40" />
            <div className="relative overflow-hidden rounded-[2rem] border border-cream-300/80 bg-white shadow-card">
              <img
                src={profile.aboutImage}
                alt="Uzair M. Umair full-body professional portrait"
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/40 to-transparent p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">NEXT Studio</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">{profile.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <div className="space-y-8">
            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="card-surface rounded-[2rem] p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl font-bold text-charcoal-900">Professional Summary</h3>
              <p className="mt-4 leading-8 text-charcoal-600">
                I am a Karachi-based graphic designer and full-stack development student who builds
                clean, responsive websites and creative brand visuals. My strength is the overlap:
                I can understand layout, typography, branding, user experience, and the front-end
                code needed to bring those ideas into a polished interface.
              </p>
              <p className="mt-4 leading-8 text-charcoal-600">
                I completed Graphic Designing from SMIT, Web Development from Bano Qabil, and I am
                currently studying Modern Web and Application Development at SMIT in a 1.5-year
                full-stack focused program.
              </p>
            </motion.div>

            {/* Timeline cards */}
            <div className="grid gap-4 md:grid-cols-2">
              {timeline.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="group rounded-2xl border border-cream-300/60 bg-white/70 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-forest-400/30 hover:shadow-card"
                >
                  <span className="inline-flex rounded-full border border-forest-400/20 bg-forest-600/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-forest-600">
                    {item.year}
                  </span>
                  <h4 className="mt-4 font-display text-lg font-bold text-charcoal-900">{item.title}</h4>
                  <p className="mt-1 text-sm font-semibold text-gold-500">{item.org}</p>
                  <p className="mt-3 text-sm leading-7 text-charcoal-500">{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {Object.entries(skills).map(([group, list], groupIndex) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
              className="card-surface rounded-2xl p-6"
            >
              <h3 className="font-display text-xl font-bold text-charcoal-900">{group}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {list.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cream-300 bg-cream-100/80 px-3 py-2 text-sm font-medium text-charcoal-700 transition hover:border-forest-400/40 hover:bg-forest-600/5 hover:text-forest-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
