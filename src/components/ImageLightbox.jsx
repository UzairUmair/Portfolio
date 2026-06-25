import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Full screen portfolio image preview"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-2xl font-light text-white backdrop-blur-xl transition hover:border-cyan/45 hover:bg-cyan/15"
        aria-label="Close full screen image"
      >
        x
      </button>

      <motion.figure
        initial={{ scale: 0.96, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative flex max-h-[92vh] w-full max-w-7xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[84vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
        />
        <figcaption className="mt-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-center text-sm font-semibold text-slate-200 backdrop-blur-xl">
          {image.alt}
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}
