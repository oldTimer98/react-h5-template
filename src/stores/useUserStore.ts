import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { UserInfo } from '@/types'

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
        setToken: (token) => {
          localStorage.setItem('token', token)
          set({ token })
        },
        setUserInfo: (userInfo) => set({ userInfo }),
        logout: () => {
          localStorage.removeItem('token')
          set({ token: '', userInfo: null })
        },
      }),
      { name: 'user-storage' },
    ),
  ),
)
