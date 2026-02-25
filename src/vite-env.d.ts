/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 开发服务器端口 */
  readonly VITE_PORT: string
  /** 是否自动打开浏览器 */
  readonly VITE_OPEN: string
  /** API 请求基础路径 */
  readonly VITE_API_BASE_URL: string
  /** 代理目标地址 */
  readonly VITE_PROXY_TARGET: string
  /** 请求超时时间（毫秒） */
  readonly VITE_API_TIMEOUT: string
  /** 是否启用 eruda 移动端调试工具 */
  readonly VITE_ENABLE_ERUDA: string
  /** 是否启用 TanStack DevTools */
  readonly VITE_ENABLE_DEVTOOLS: string
  /** 是否开启 gzip + brotli 压缩 */
  readonly VITE_BUILD_GZIP: string
  /** 是否删除 console/debugger */
  readonly VITE_DROP_CONSOLE: string
  /** 打包输出目录 */
  readonly VITE_OUT_DIR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
