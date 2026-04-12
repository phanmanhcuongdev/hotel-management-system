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

export type MeApiResponse = LoginUserDto

export async function login(username: string, password: string) {
  const response = await apiClient.post<LoginApiResponse>('/auth/login', {
    username,
    password,
  })

  return response.data
}

export async function getCurrentUser() {
  const response = await apiClient.get<MeApiResponse>('/auth/me', {
    metadata: {
      skipGlobalErrorLog: true,
    },
  })
  return response.data
}

export async function logout() {
  await apiClient.post('/auth/logout')
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export async function changePassword(data: ChangePasswordRequest) {
  await apiClient.post('/auth/change-password', data)
}
