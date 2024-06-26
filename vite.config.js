import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
				  @import "@/assets/scss/abstracts/_variables.scss";
				  @import "@/assets/scss/abstracts/_mixins.scss";
				  @import "@/assets/scss/components/_all.scss";
				  @import "@/assets/scss/pages/_all.scss";
				`,
			},
		},
	},
});
