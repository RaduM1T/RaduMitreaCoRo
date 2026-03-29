/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Mulish', 'sans-serif'],
        body: ['Figtree', 'sans-serif'],
      },
      colors: {
        inkwell:         '#0F1516',   // near-black — text, heavy elements
        'lunar-eclipse': '#234C58',   // deep teal — primary accent
        'creme-brulee':  '#5E524B',   // warm taupe — secondary accent
        'au-lait':       '#C9C2C2',   // warm cool grey — soft surfaces
        steel:           '#7F8C94',   // steel blue-grey — secondary text
      },
      boxShadow: {
        glass:    '0 4px 24px rgba(15,21,22,0.07), inset 0 1px 0 rgba(255,255,255,0.95)',
        'glass-lg': '0 12px 48px rgba(15,21,22,0.13), inset 0 1px 0 rgba(255,255,255,0.98)',
        glow:     '0 0 24px rgba(35,76,88,0.22)',
        'glow-lg': '0 0 48px rgba(35,76,88,0.32)',
      },
      animation: {
        'orb-float-1': 'orbFloat1 22s ease-in-out infinite',
        'orb-float-2': 'orbFloat2 30s ease-in-out infinite',
        'orb-float-3': 'orbFloat3 26s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
