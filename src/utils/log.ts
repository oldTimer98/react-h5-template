import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const isDev = import.meta.env.DEV

export function logRequest(config: InternalAxiosRequestConfig) {
  if (!isDev) return
  const method = (config.method ?? 'GET').toUpperCase()
  const url = `${config.baseURL ?? ''}${config.url ?? ''}`
  console.groupCollapsed(
    `%c正在请求 ${method} %c${url}`,
    'color:#1677ff;font-weight:bold',
    'color:#666',
  )
  if (config.params) console.log('%cParams', 'color:#faad14', config.params)
  if (config.data) console.log('%cBody', 'color:#52c41a', config.data)
  console.log('%cHeaders', 'color:#999', config.headers)
  console.groupEnd()
}

export function logResponse(response: AxiosResponse) {
  if (!isDev) return
  const method = (response.config.method ?? 'GET').toUpperCase()
  const url = `${response.config.baseURL ?? ''}${response.config.url ?? ''}`
  const duration = response.headers['x-response-time'] || ''
  console.groupCollapsed(
    `%c响应结果 ${method} %c${url} %c${response.status}${duration ? ` (${duration})` : ''}`,
    'color:#52c41a;font-weight:bold',
    'color:#666',
    'color:#999',
  )
  console.log('%cData', 'color:#1677ff', response.data)
  console.groupEnd()
}

export function logError(error: AxiosError) {
  if (!isDev) return
  const config = error.config
  const method = (config?.method ?? 'GET').toUpperCase()
  const url = `${config?.baseURL ?? ''}${config?.url ?? ''}`
  const status = error.response?.status ?? 'N/A'
  console.groupCollapsed(
    `%c❌ ${method} %c${url} %c${status}`,
    'color:#ff4d4f;font-weight:bold',
    'color:#666',
    'color:#ff4d4f',
  )
  if (error.response?.data) console.log('%cResponse', 'color:#ff4d4f', error.response.data)
  console.log('%cError', 'color:#999', error.message)
  console.groupEnd()
}
