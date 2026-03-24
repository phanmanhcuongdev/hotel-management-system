import { apiClient } from './client'

export interface LoginApiResponse {
  token?: string
  accessToken?: string
  user?: {
    id?: string | number
    fullName?: string
    name?: string
    email?: string
    role?: string
  }
}

export async function login(username: string, password: string) {
  const response = await apiClient.post<LoginApiResponse>('/auth/login', {
    username,
    password,
  })

  return response.data
}
