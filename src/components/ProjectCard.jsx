import { useState } from 'react'
import { motion } from 'framer-motion'

function WebPreview() {
  return (
    <div className="flex h-full min-h-[230px] flex-col bg-gradient-to-br from-ink-800 via-ink-700 to-ink-900 p-5">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime" />
        <span className="ml-3 flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
          pick-and-wear.vercel.app
        </span>
      </div>
      <div className="grid flex-1 place-items-center">
        <div className="w-full max-w-xs">
          <div className="mb-4 h-24 rounded-3xl border border-cyan/25 bg-cyan/10 shadow-glow" />
          <div className="grid grid-cols-3 gap-3">
            <span className="h-16 rounded-2xl bg-white/10" />
            <span className="h-16 rounded-2xl bg-white/10" />
            <span className="h-16 rounded-2xl bg-white/10" />
          </div>
          <div className="mt-4 h-3 w-2/3 rounded-full bg-cyan/40" />
          <div className="mt-2 h-3 w-1/2 rounded-full bg-violet/40" />
        </div>
      </div>
    </div>
  )
}

export default function ProjectCard({ project, index, onPreview }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 10
    const rotateX = ((0.5 - y / rect.height) * 10)
    setTilt({ rotateX, rotateY })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-card transition duration-300 hover:border-cyan/40 hover:bg-white/[0.07] hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        {project.thumb ? (
          <button
            type="button"
            onClick={() => onPreview?.({ src: project.thumb, alt: project.title })}
            className="block h-full w-full cursor-zoom-in"
            aria-label={`Open ${project.title} preview in full screen`}
          >
            <img
              src={project.thumb}
              alt={`${project.title} thumbnail`}
              loading={project.id === 'pick-and-wear' ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </button>
        ) : (
          <WebPreview />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent opacity-80" />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-ink-900/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan backdrop-blur-xl">
          {project.category}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 min-h-[4.5rem] text-sm leading-7 text-slate-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span key={tool} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300">
              {tool}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noreferrer" className="btn-ghost px-4 py-2 text-xs">
              View Project
            </a>
          ) : (
            <button
              type="button"
              onClick={() => project.thumb && onPreview?.({ src: project.thumb, alt: project.title })}
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan/35 hover:text-cyan"
            >
              View Full Screen
            </button>
          )}
          {project.featured ? (
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-lime">Featured</span>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
