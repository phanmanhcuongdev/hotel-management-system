export interface User {
  id: number
  username: string
  fullName: string
  position: string
  mail?: string | null
  description?: string | null
}

export interface CreateUserRequest {
  username: string
  password: string
  fullName: string
  position: string
  mail?: string
  description?: string
}

export interface UpdateUserRequest {
  username: string
  fullName: string
  position: string
  mail?: string
  description?: string
}
