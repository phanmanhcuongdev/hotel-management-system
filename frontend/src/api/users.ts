import { apiClient } from './client'
import type { CreateUserRequest, UpdateUserRequest, User } from '../types'

export interface UsersSearchParams {
  keyword?: string
}

export const usersApi = {
  getAll: async (params?: UsersSearchParams): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users', { params })
    return response.data
  },

  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  create: async (data: CreateUserRequest): Promise<User> => {
    const response = await apiClient.post<User>('/users', data)
    return response.data
  },

  update: async (id: number, data: UpdateUserRequest): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/users/${id}`)
  },
}
