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
    <section id="projects" className="relative overflow-hidden bg-ink-800 py-24 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="absolute right-10 top-32 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />

      <div className="container-px relative z-10">
        <SectionHeader
          eyebrow="Selected Work"
          title="Real projects presented with client-ready polish."
          copy="A focused mix of web development, branding, visual design, and UI direction. The cards below use your actual portfolio assets wherever available."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                category === item
                  ? 'border-cyan/45 bg-cyan/15 text-cyan shadow-glow'
                  : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onPreview={setPreviewImage} />
          ))}
        </div>

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
              <h3 className="mt-4 font-display text-3xl font-bold text-white">
                31 graphic projects, all openable full screen
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Click any thumbnail to inspect the design at a larger size. This gallery uses every PNG found in your
              Graphic Project folder.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => setPreviewImage(image)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-left transition hover:border-cyan/35 hover:shadow-glow"
                aria-label={`Open ${image.alt} in full screen`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan opacity-0 backdrop-blur-xl transition group-hover:opacity-100">
                  Full Screen
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
