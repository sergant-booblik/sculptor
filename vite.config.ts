import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoaderPlugin from 'vite-svg-loader';

function createSvgLoaderPlugin() {
  return svgLoaderPlugin({
    svgo: true,
    defaultImport: 'component',
  });
}

export default defineConfig({
  server: {
    port: 5522,
  },
  plugins: [
    vue(),
    createSvgLoaderPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
