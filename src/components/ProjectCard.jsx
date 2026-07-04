import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index, onPreview }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 8
    const rotateX = ((0.5 - y / rect.height) * 8)
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
        transition: 'transform 0.15s ease-out',
      }}
      className="group overflow-hidden rounded-2xl border border-cream-300/60 bg-white/80 shadow-soft backdrop-blur-sm transition duration-300 hover:border-forest-400/30 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
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
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </button>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-cream-200 to-sand-200">
            <span className="font-display text-lg font-bold text-charcoal-400">Preview</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-forest-600 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-charcoal-900">{project.title}</h3>
        <p className="mt-3 min-h-[4.5rem] text-sm leading-7 text-charcoal-500">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span key={tool} className="rounded-full bg-cream-200/80 px-3 py-1 text-xs font-semibold text-charcoal-600">
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
              className="rounded-full border border-cream-300 bg-cream-100 px-4 py-2 text-xs font-semibold text-charcoal-600 transition hover:border-forest-400/40 hover:text-forest-600"
            >
              View Full Screen
            </button>
          )}
          {project.featured ? (
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold-500">Featured</span>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
