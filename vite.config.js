import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	assetsInclude: [
		'../assets/images/badges/*.*',
		'../assets/images/exercises/*.*',
		'../assets/images/logo.png'
	],
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		hmr: { overlay: false }
	},
	build: {
		target: 'esnext'
	}
});
