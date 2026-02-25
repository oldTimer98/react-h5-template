import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { UserInfo } from '@/types/user'

interface UserState {
  token: string
  userInfo: UserInfo | null
  setToken: (token: string) => void
  setUserInfo: (info: UserInfo) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        userInfo: null,
        setToken: (token) => set({ token }),
        setUserInfo: (userInfo) => set({ userInfo }),
        logout: () => set({ token: '', userInfo: null }),
      }),
      { name: 'user-storage' },
    ),
  ),
)

/** 在非 React 上下文（如 axios 拦截器）中读取 token */
export function getToken() {
  return useUserStore.getState().token
}

/** 在非 React 上下文中清除登录态 */
export function clearAuth() {
  useUserStore.getState().logout()
}
