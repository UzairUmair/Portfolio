// Verified against the supplied September 2026 résumé and project brief.
export const profile = {
  name: 'Uzair Umair',
  title: 'MERN Stack Developer',
  location: 'Karachi, Pakistan',
  portrait: { src: '/images/uzair-portrait-1000.webp', small: '/images/uzair-portrait-560.webp' },
  email: 'uzairprivv@gmail.com',
  whatsapp: { number: '03707429349', url: 'https://wa.me/923707429349' },
  resume: '/resume/uzair-m-umair-resume.pdf',
  siteUrl: (import.meta.env?.VITE_SITE_URL || (typeof process !== 'undefined' ? process.env.VITE_SITE_URL : '') || '').replace(/\/$/, ''),
  intro: 'MERN Stack Developer in Karachi, building full-stack web applications with MongoDB, Express.js, React and Node.js.',
  socials: [{ label: 'GitHub', url: 'https://github.com/UzairUmair' }, { label: 'LinkedIn', url: 'https://www.linkedin.com/in/uzair-m-umair-53a778373' }],
};
