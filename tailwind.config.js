/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          DEFAULT: '#3b82f6',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          DEFAULT: '#22c55e',
        },
      },
      fontFamily: {
        heading: 'Oxanium-Bold',
        'heading-bold': 'Oxanium-Bold',
        'heading-semibold': 'Oxanium-SemiBold',
        'heading-medium': 'Oxanium-Medium',
        subheading: 'Oxanium-SemiBold',
        body: 'Varta-Regular',
        'body-regular': 'Varta-Regular',
        'body-medium': 'Varta-Medium',
        'body-semibold': 'Varta-SemiBold',
      },
      fontSize: {
        'h1': '48px',
        'h2': '36px',
        'h3': '24px',
        'subheading': '18px',
        'body': '16px',
        'body-sm': '14px',
        'body-lg': '18px',
      },
    },
  },
  plugins: [],
}

