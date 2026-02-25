/** 通用 API 响应格式 — 对接后端 { code, data, message } 规范 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}
