import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { Toast } from 'antd-mobile'
import type { ApiResponse } from '@/types'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
})

// 请求拦截器 — 注入 Token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器 — 统一错误处理
const HTTP_ERROR_MAP: Record<number, string> = {
  400: '请求参数错误',
  401: '登录已过期',
  403: '拒绝访问',
  404: '资源不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
}

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const raw = response.data

    if (typeof raw !== 'object' || raw === null || !('code' in raw)) {
      response.data = { code: 200, data: raw, message: 'ok' }
      return response
    }

    const res = raw as ApiResponse
    if (res.code === 0 || res.code === 200) return response

    if (res.code === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    Toast.show({ icon: 'fail', content: res.message || '请求失败' })
    return Promise.reject(new Error(res.message))
  },
  (error: AxiosError) => {
    const status = error.response?.status
    const msg = (status && HTTP_ERROR_MAP[status]) || '网络连接异常'

    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    } else {
      Toast.show({ icon: 'fail', content: msg })
    }

    return Promise.reject(error)
  },
)

export function get<T>(url: string, params?: object, config?: AxiosRequestConfig) {
  return instance.get<ApiResponse<T>>(url, { params, ...config }).then((r) => r.data)
}

export function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return instance.post<ApiResponse<T>>(url, data, config).then((r) => r.data)
}

export function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return instance.put<ApiResponse<T>>(url, data, config).then((r) => r.data)
}

export function del<T>(url: string, config?: AxiosRequestConfig) {
  return instance.delete<ApiResponse<T>>(url, config).then((r) => r.data)
}

export { instance as axiosInstance }
