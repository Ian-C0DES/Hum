import { sveltekit } from '@sveltejs/kit/vite';
// import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vitest/config';
export default defineConfig({
	assetsInclude: ['../assets/images/badges/*.*', '../assets/images/exercises/*.*'],
	plugins: [
		sveltekit()
		// imagetools(),
	],
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
