import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from './SectionHeader.jsx'
import ProjectCard from './ProjectCard.jsx'
import ImageLightbox from './ImageLightbox.jsx'
import { CATEGORIES, galleryImages, projects } from '../data/projects.js'

export default function Projects() {
  const [category, setCategory] = useState('All')
  const [previewImage, setPreviewImage] = useState(null)
  const visibleProjects = useMemo(() => {
    if (category === 'All') return projects
    return projects.filter((project) => project.category === category || project.tags.includes(category))
  }, [category])

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-sand-100/50 to-cream-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest-400/20 to-transparent" />
      <div className="absolute -right-20 top-40 h-64 w-64 rounded-full bg-forest-400/5" />

      <div className="container-px relative z-10">
        <SectionHeader
          eyebrow="Selected Work"
          title="Real projects, professional quality."
          copy="A focused mix of web development, branding, visual design, and UI direction showcasing creative capability and technical skill."
        />

        {/* Category filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                category === item
                  ? 'border-forest-500/40 bg-forest-600/10 text-forest-600 shadow-soft'
                  : 'border-cream-300 bg-white/70 text-charcoal-500 hover:border-forest-400/30 hover:bg-white hover:text-charcoal-800'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onPreview={setPreviewImage} />
          ))}
        </div>

        {/* Gallery section */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="mt-20"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Design Gallery</span>
              <h3 className="mt-4 font-display text-3xl font-bold text-charcoal-900">
                31 graphic projects
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-charcoal-500">
              Click any thumbnail to inspect the design at full size. This gallery showcases the full range of graphic work.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => setPreviewImage(image)}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-cream-300/60 bg-white/60 text-left shadow-soft transition hover:border-forest-400/30 hover:shadow-card"
                aria-label={`Open ${image.alt} in full screen`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-forest-600 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                  View
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {previewImage ? <ImageLightbox image={previewImage} onClose={() => setPreviewImage(null)} /> : null}
      </AnimatePresence>
    </section>
  )
}
