import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { compression } from 'vite-plugin-compression2'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const isDev = mode === 'development'
  const enableGzip = env.VITE_BUILD_GZIP === 'true'

  const compressionPlugins: PluginOption[] = []
  if (enableGzip) {
    compressionPlugins.push(
      compression({
        algorithms: ['gzip', 'brotliCompress'],
        threshold: 1024,
        deleteOriginalAssets: false,
      }),
    )
  }

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/pages',
        generatedRouteTree: './src/routeTree.gen.ts',
      }),
      UnoCSS(),
      react(),
      ...compressionPlugins,
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        ...(isDev ? {} : { eruda: path.resolve(__dirname, 'src/utils/eruda-noop.ts') }),
      },
    },

    css: {
      devSourcemap: true,
    },

    json: {
      namedExports: false,
      stringify: true,
    },

    // ============================================================
    // 开发服务器
    // ============================================================
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT) || 3000,
      strictPort: false,
      open: env.VITE_OPEN === 'true',
      cors: true,
      hmr: true,
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), ''),
        },
      },
    },

    // ============================================================
    // 构建配置
    // ============================================================
    build: {
      outDir: env.VITE_OUT_DIR || 'dist',
      target: 'es2020',
      minify: 'esbuild',
      cssMinify: 'esbuild',
      cssTarget: ['chrome61'],
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1500,
      sourcemap: isDev,
      reportCompressedSize: true,
      modulePreload: { polyfill: true },
      rollupOptions: {
        output: {
          compact: true,
          entryFileNames: 'assets/js/[name]-[hash:8].js',
          chunkFileNames: 'assets/js/[name]-[hash:8].js',
          assetFileNames: ({ names }) => {
            const name = names?.[0] ?? ''
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name))
              return 'assets/img/[name]-[hash:8].[ext]'
            if (/\.(woff2?|eot|ttf|otf)$/.test(name)) return 'assets/font/[name]-[hash:8].[ext]'
            if (/\.css$/.test(name)) return 'assets/css/[name]-[hash:8].[ext]'
            return 'assets/[ext]/[name]-[hash:8].[ext]'
          },
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (
              id.includes('/react/') ||
              id.includes('react-dom') ||
              id.includes('antd-mobile') ||
              id.includes('@react-spring') ||
              id.includes('scheduler')
            )
              return 'vendor-core'
            if (id.includes('@tanstack/react-router')) return 'vendor-router'
            if (id.includes('@tanstack/react-query')) return 'vendor-query'
            if (id.includes('framer-motion')) return 'vendor-motion'
          },
        },
      },
    },

    // ============================================================
    // esbuild（生产环境移除 console / debugger）
    // ============================================================
    esbuild: isDev
      ? undefined
      : {
          pure: env.VITE_DROP_CONSOLE === 'true' ? ['console.log', 'console.debug'] : [],
          drop: env.VITE_DROP_CONSOLE === 'true' ? ['debugger'] : [],
          legalComments: 'none',
        },
  }
})
