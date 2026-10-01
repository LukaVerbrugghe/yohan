/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#FFD6E0',
        'soft-rose': '#FFB6C1',
        'soft-peach': '#FFDAB9',
        'soft-lavender': '#E6E6FA',
        'soft-blue': '#B0E0E6',
        'warm-white': '#FFF5F5',
      },
    },
  },
  plugins: [],
}
