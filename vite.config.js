import { sveltekit } from '@sveltejs/kit/vite';


/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
