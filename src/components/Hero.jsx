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
      {/* Soft natural gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-sand-100" />

      {/* Subtle organic shapes in background */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-forest-500/5" />
      <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-gold-400/8" />
      <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-forest-400/5" />

      {/* Hero image */}
      <img
        src={profile.heroImage}
        alt="Uzair M. Umair professional portrait"
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-[66%_center] opacity-20 md:w-[55%] md:opacity-30"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/90 to-cream-100/40" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream-100 to-transparent" />

      {/* 3D Scene */}
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
            {profile.location} &mdash; {profile.brand}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-charcoal-950 sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {profile.name}
            <span className="mt-3 block text-gradient">{profile.headline}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-charcoal-600 sm:text-lg">
            I design creative brand visuals and build modern responsive websites with clean UI and smooth user experience.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
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

          <motion.div variants={fadeUp} className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card-surface rounded-2xl px-4 py-4">
                <div className="font-display text-2xl font-bold text-forest-600">{stat.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-charcoal-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
