/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        text: {
          DEFAULT: '#111827',
          dark: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
}