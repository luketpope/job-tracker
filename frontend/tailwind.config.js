/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeShake: {
          '0%': { opacity: 0, transform: 'translateX(0)' },
          '20%': { opacity: 1, transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-shake': 'fadeShake 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
}

