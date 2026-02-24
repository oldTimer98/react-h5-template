export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export interface CreateTodoParams {
  title: string
  userId: number
  completed?: boolean
}

export interface UpdateTodoParams extends Partial<CreateTodoParams> {
  id: number
}
