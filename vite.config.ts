import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/pages',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    UnoCSS(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
})
