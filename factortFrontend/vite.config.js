import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	test: {
		include: ['**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: 'src/setupTests.ts'
	}
};

export default config;
