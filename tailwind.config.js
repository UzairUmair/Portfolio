/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Natural premium palette
        forest: {
          950: '#0a1a12',
          900: '#0f2518',
          800: '#14301e',
          700: '#1a4028',
          600: '#245534',
          500: '#2d6b40',
          400: '#3d8b55',
          300: '#5aab72',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf7f2',
          200: '#f5f0e8',
          300: '#ede5d8',
          400: '#e0d4c3',
          500: '#c9b99e',
        },
        sand: {
          100: '#f8f4ed',
          200: '#f0ead9',
          300: '#e5dcc8',
          400: '#d4c8ab',
          500: '#b8a882',
        },
        charcoal: {
          950: '#121212',
          900: '#1a1a1a',
          800: '#252525',
          700: '#333333',
          600: '#444444',
          500: '#555555',
        },
        gold: {
          400: '#d4a853',
          500: '#b8933e',
          600: '#9a7a30',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0,0,0,0.12)',
        card: '0 8px 32px -8px rgba(0,0,0,0.18)',
        'card-hover': '0 16px 48px -12px rgba(0,0,0,0.25)',
        glow: '0 0 40px -8px rgba(45,107,64,0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
