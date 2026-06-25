import { motion } from 'framer-motion'
import { profile } from '../data/site.js'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={profile.whatsappLink}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.45 }}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-lg font-black text-[#062412] shadow-[0_0_35px_rgba(37,211,102,0.55)] transition hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(37,211,102,0.75)] sm:h-16 sm:w-16"
      aria-label="Message Uzair on WhatsApp"
    >
      WA
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30" />
    </motion.a>
  )
}
