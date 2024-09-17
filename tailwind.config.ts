/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F45D2C',
        orange: '#F45D2C',
        black: '#050301',
        'secondary-black': '#555555',
        'default-gray': '#7A7978',
        'off-white': '#FAFAFA',
        'default-gray-2': '#F3F3F3',
        
        danger: '#F25A68',
        'danger-light': '#FCE3E5',
        warn: '#F1872D',
        'warn-light': '#FCF2E3',
        success: '#0B7F56',
        'success-light': '#E3FCF3',
        'divider-gray': '#EAEAEA',
        'gray-bg': '#F3F3F3',
        'light-gray-bg': '#FAFAFA',
        'pry-gray': '#7A7978',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/forms')],
};

