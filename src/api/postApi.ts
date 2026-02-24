import { get, post } from '@/utils/request'
import type { Post, CreatePostParams } from '@/types'

const postApi = {
  getList: (params?: { _limit?: number; _page?: number }) => get<Post[]>('/posts', params),

  getById: (id: number) => get<Post>(`/posts/${id}`),

  create: (data: CreatePostParams) => post<Post>('/posts', data),
}

export default postApi
