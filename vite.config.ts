import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import process from 'process';
export default defineConfig({
	base: '',
	plugins: [react()],
	build: {
		minify: process.env.NODE_ENV === 'production' ? 'terser' : false, // Minify only in production
		cssMinify: process.env.NODE_ENV === 'production' ? 'lightningcss' : false, // Minify only in production
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.svg', '.png'],
	},
	server: {
		hmr: {
			overlay: false,
		},
	},
});
