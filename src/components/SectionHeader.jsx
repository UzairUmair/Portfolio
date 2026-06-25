import { motion } from 'framer-motion'

export default function SectionHeader({ eyebrow, title, copy, align = 'center' }) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">{copy}</p> : null}
    </motion.div>
  )
}
