import { apiClient } from './client'
import type { RoomType } from '../types'

export interface RoomTypesSearchParams {
  keyword?: string
}

export interface CreateRoomTypeRequest {
  name: string
  description?: string
  price: number
  capacity: number
}

export type UpdateRoomTypeRequest = CreateRoomTypeRequest

export const roomTypesApi = {
  getAll: async (params?: RoomTypesSearchParams): Promise<RoomType[]> => {
    const response = await apiClient.get<RoomType[]>('/room-types', { params })
    return response.data
  },

  getById: async (id: number): Promise<RoomType> => {
    const response = await apiClient.get<RoomType>(`/room-types/${id}`)
    return response.data
  },

  create: async (data: CreateRoomTypeRequest): Promise<RoomType> => {
    const response = await apiClient.post<RoomType>('/room-types', data)
    return response.data
  },

  update: async (id: number, data: UpdateRoomTypeRequest): Promise<RoomType> => {
    const response = await apiClient.patch<RoomType>(`/room-types/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/room-types/${id}`)
  },
}
