/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Lighter greys so small labels meet WCAG AA contrast on the dark background
        gray: { 500: '#8E93A2', 600: '#7D8291' },
        lav: '#CBB3E8',   // lavender – primary accent
        acid: '#D4FF3F',  // lime – calls to action
        ver: '#E34234',   // vermilion – sparing highlights
        ink: '#0E0C13',   // near-black base
        panel: '#17141F', // raised surfaces
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
