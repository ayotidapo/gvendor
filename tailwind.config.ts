/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
	],
	theme: {
		extend: {
			colors: {
				img: '#FFFCF9',
				gold1: 'var(--gold1)',
				baseCol: '#555555',
				primary: '#F45D2C',
				orange: '#F45D2C',
				black: '#050301',
				red: '#B3434D',
				'default-blue': '#0D99F2',
				'secondary-black': '#555555',
				'default-gray': '#7A7978',
				'off-white': '#FAFAFA',
				'default-gray-2': '#F3F3F3',
				'light-gray': '#C2C3C3',
				danger: '#F25A68',
				'danger-light': '#FCE3E5',
				warn: '#F1872D',
				'warn-light': '#FCF2E3',
				success: '#0B7F56',
				'success-light': '#E3FCF3',
				'divider-gray': '#EAEAEA',
				'gray-bg': '#F3F3F3',
				'light-gray-bg': '#FAFAFA',
			},
			fontFamily: {
				geist: [`var(--geist)`],
				recoleta: [`var(--recoleta)`],
			},
			screens: {
				xs: '500px',
				xc: '425px',
				xx: '320px',
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('@tailwindcss/forms')],
};
