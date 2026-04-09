import { apiClient } from './client'

export interface LoginUserDto {
  id: string | number
  username: string
  fullName: string
  position: string
}

export interface LoginApiResponse {
  token: string
  user: LoginUserDto
}

export async function login(username: string, password: string) {
  const response = await apiClient.post<LoginApiResponse>('/auth/login', {
    username,
    password,
  })

  return response.data
}
