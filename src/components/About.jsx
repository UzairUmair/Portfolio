import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader.jsx'
import { profile, skills, timeline } from '../data/site.js'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-900 py-24 sm:py-28">
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute bottom-20 right-0 h-80 w-80 rounded-full bg-violet/10 blur-3xl" />

      <div className="container-px relative z-10">
        <SectionHeader
          eyebrow="About"
          title="Designer thinking, developer execution."
          copy="I combine visual design skills with front-end development so a project looks strong, feels smooth, and is built with a practical structure."
          align="left"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan/25 via-violet/10 to-lime/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-card">
              <img
                src={profile.aboutImage}
                alt="Uzair M. Umair full-body professional portrait"
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan">NEXT Studio</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">{profile.role}</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-[2rem] p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl font-bold text-white">Professional Summary</h3>
              <p className="mt-4 leading-8 text-slate-300">
                I am a Karachi-based graphic designer and full-stack development student who builds
                clean, responsive websites and creative brand visuals. My strength is the overlap:
                I can understand layout, typography, branding, user experience, and the front-end
                code needed to bring those ideas into a polished interface.
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                I completed Graphic Designing from SMIT, Web Development from Bano Qabil, and I am
                currently studying Modern Web and Application Development at SMIT in a 1.5-year
                full-stack focused program.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {timeline.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/35 hover:bg-white/[0.07]"
                >
                  <span className="inline-flex rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan">
                    {item.year}
                  </span>
                  <h4 className="mt-4 font-display text-xl font-bold text-white">{item.title}</h4>
                  <p className="mt-1 text-sm font-semibold text-violet">{item.org}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {Object.entries(skills).map(([group, list], groupIndex) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
              className="glass rounded-3xl p-6"
            >
              <h3 className="font-display text-xl font-bold text-white">{group}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {list.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-cyan/30 hover:text-cyan"
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
