export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface CreatePostParams {
  title: string
  body: string
  userId: number
}
