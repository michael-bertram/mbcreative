/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This links the name in your CSS/HTML to Tailwind's font-sans class
        sans: ['"Stack Sans Text"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}