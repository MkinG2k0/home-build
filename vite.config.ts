/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy(),
		tailwindcss(),
		mkcert(),
		VitePWA({
			dev: false,
			filename: 'sw.ts',
			manifest: false,
			registerType: 'prompt',
			srcDir: 'src',
			strategies: 'injectManifest',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
			},
		}),
	],
	server: {
		https: true,
	},
	resolve: {
		dedupe: ['react', 'react-dom'],
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.ts',
	},
})
