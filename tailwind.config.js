/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#1e40af", // Brighter blue
          light: "#3b82f6",
          dark: "#1e3a8a",
        },
        primary: "#1e40af",
        background: "#ffffff",
        foreground: "#111827",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        paragraph: ["Poppins", "sans-serif"],
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s linear infinite',
      },
      keyframes: {
        'slow-zoom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
