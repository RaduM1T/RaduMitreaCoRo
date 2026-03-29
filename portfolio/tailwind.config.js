/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Figtree', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#02050f',
          900: '#04081a',
          800: '#060d22',
          700: '#091228',
          600: '#0d1830',
        },
        cyan: {
          400: '#22d3ee',
          500: '#00b4d8',
          600: '#0090b8',
          700: '#0077b6',
          800: '#005fa3',
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)',
        'glass-lg': '0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
        glow: '0 0 24px rgba(0,180,216,0.3)',
        'glow-lg': '0 0 48px rgba(0,180,216,0.4)',
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'orb-float-1': 'orbFloat1 20s ease-in-out infinite',
        'orb-float-2': 'orbFloat2 28s ease-in-out infinite',
        'orb-float-3': 'orbFloat3 24s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.05)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.95)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-50px, 80px) scale(1.08)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '40%': { transform: 'translate(60px, 30px) scale(0.92)' },
          '80%': { transform: 'translate(-20px, -50px) scale(1.05)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
