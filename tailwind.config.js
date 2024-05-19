/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thumb': {
          'scrollbar-color': 'rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1)', // Thumb and track color
          'scrollbar-width': 'thin', // Scrollbar width
        },
        '.scrollbar-thumb-rounded': {
          'scrollbar-color': 'rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1)', // Thumb and track color
          'scrollbar-width': 'thin', // Scrollbar width
          'scrollbar-thumb-radius': '8px', // Thumb border radius
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

