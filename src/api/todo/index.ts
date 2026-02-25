import { get, post, put, del } from '@/utils/request'
import type { Todo, CreateTodoParams, UpdateTodoParams } from '@/types/todo'

const todoApi = {
  getList: (params?: { _limit?: number; _page?: number }) => get<Todo[]>('/todos', params),

  getById: (id: number) => get<Todo>(`/todos/${id}`),

  create: (data: CreateTodoParams) => post<Todo>('/todos', data),

  update: (data: UpdateTodoParams) => put<Todo>(`/todos/${data.id}`, data),

  remove: (id: number) => del<Todo>(`/todos/${id}`),
}

export default todoApi
