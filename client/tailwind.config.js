/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playwrite DE LA", "sans-serif"], // Match the name from the @import
      },
    },
  },
  plugins: [],
}
