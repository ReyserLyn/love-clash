import type { Config } from 'tailwindcss';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				potta: ['Potta One', 'cursive'],
				host: ['Host Grotesk', 'sans-serif'],
			},
		},
	},
	plugins: [],
} satisfies Config;
