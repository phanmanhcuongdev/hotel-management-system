import { apiClient } from './client'
import type { Room, RoomStatus, CreateRoomRequest, UpdateRoomRequest } from '../types'

export const roomsApi = {
  getAll: async (status?: RoomStatus): Promise<Room[]> => {
    const params = status ? { status } : {}
    const response = await apiClient.get<Room[]>('/rooms', { params })
    return response.data
  },

  getById: async (id: number): Promise<Room> => {
    const response = await apiClient.get<Room>(`/rooms/${id}`)
    return response.data
  },

  create: async (data: CreateRoomRequest): Promise<Room> => {
    const response = await apiClient.post<Room>('/rooms', data)
    return response.data
  },

  update: async (id: number, data: UpdateRoomRequest): Promise<Room> => {
    const response = await apiClient.put<Room>(`/rooms/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/rooms/${id}`)
  },
}
