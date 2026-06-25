/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — premium dark + neon
        ink: {
          900: '#05060f', // near-black navy
          800: '#080a1a',
          700: '#0b0f24',
          600: '#11162e',
        },
        electric: '#3b82f6', // electric blue
        cyan: '#22d3ee',     // neon cyan
        violet: '#8b5cf6',   // purple glow
        lime: '#34d399',     // small green accent
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-glow':
          'linear-gradient(to right, rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.07) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,0.25), 0 0 40px -8px rgba(34,211,238,0.45)',
        'glow-violet': '0 0 0 1px rgba(139,92,246,0.3), 0 0 50px -10px rgba(139,92,246,0.5)',
        card: '0 10px 40px -12px rgba(0,0,0,0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
}
