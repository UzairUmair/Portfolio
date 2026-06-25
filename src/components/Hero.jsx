import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { profile, stats } from '../data/site.js'

const ThreeScene = lazy(() => import('./ThreeScene.jsx'))

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid-glow bg-[length:64px_64px] opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_82%_32%,rgba(139,92,246,0.26),transparent_34%),linear-gradient(110deg,#05060f_0%,rgba(5,6,15,0.76)_43%,rgba(5,6,15,0.28)_100%)]" />
      <img
        src={profile.heroImage}
        alt="Uzair M. Umair professional portrait"
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-[66%_center] opacity-75 mix-blend-screen md:w-[68%]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/78 to-ink-900/35" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink-900 to-transparent" />
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.11 }}
        className="container-px relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-20"
      >
        <div className="max-w-3xl">
          <motion.div variants={fadeUp} className="eyebrow">
            {profile.location} / {profile.brand}
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-5xl font-display text-4xl font-bold leading-[1.03] text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
          >
            {profile.name}
            <span className="mt-3 block text-gradient">{profile.headline}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            {profile.subheadline}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-base leading-8 text-slate-400">
            {profile.recruiterPitch}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href={profile.cv} download className="btn-ghost">
              Download CV
            </a>
            <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-whatsapp">
              WhatsApp Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-4 py-4">
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="pointer-events-none absolute bottom-24 right-6 z-20 hidden w-72 rounded-3xl border border-cyan/25 bg-ink-800/60 p-4 shadow-glow backdrop-blur-2xl xl:block"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">Candidate Snapshot</span>
          <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
        </div>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <p className="flex justify-between gap-4">
            <span>Design</span>
            <span className="font-semibold text-white">Branding / UI</span>
          </p>
          <p className="flex justify-between gap-4">
            <span>Development</span>
            <span className="font-semibold text-white">React / Front-end</span>
          </p>
          <p className="flex justify-between gap-4">
            <span>Learning</span>
            <span className="font-semibold text-white">Full Stack</span>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
