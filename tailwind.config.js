/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3ff',   // Light blue
          500: '#0051b3',  // Deep blue
          600: '#003d8f',  // Darker blue
        },
        secondary: {
          50: '#f8fafc',   // Light slate
          500: '#475569',  // Slate
          600: '#334155',  // Dark slate
        },
        accent: {
          50: '#ecfeff',   // Light cyan
          500: '#0369a1',  // Dark blue-cyan
          600: '#075985',  // Even darker blue-cyan
        }
      }
    },
  },
  plugins: [],
};