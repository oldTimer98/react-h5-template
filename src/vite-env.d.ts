/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** API 请求基础路径 */
  readonly VITE_API_BASE_URL: string
  /** 是否启用 eruda 移动端调试工具 */
  readonly VITE_ENABLE_ERUDA: string
  /** 是否启用 TanStack DevTools（Router + Query） */
  readonly VITE_ENABLE_DEVTOOLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
