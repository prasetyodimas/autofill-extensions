import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '.' },
        { src: 'src/background/background.js', dest: '.' },
        { src: 'public/icon.png', dest: '.' }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/popup/components/ui'),
      '@feature': path.resolve(__dirname, './src/popup/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles')
    },
  },
  build: {
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        dir: 'dist',
      },
    },
  }
})
