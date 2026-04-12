import { apiClient } from './client'
import type { CreateRoomRequest, Room, RoomStatus, UpdateRoomRequest } from '../types'

export interface RoomsSearchParams {
  keyword?: string
  status?: RoomStatus
  typeId?: number
}

export interface AvailableRoomsSearchParams {
  checkIn: string
  checkOut: string
  keyword?: string
  typeId?: number
}

export const roomsApi = {
  getAll: async (filters?: RoomsSearchParams): Promise<Room[]> => {
    const params = {
      keyword: filters?.keyword || undefined,
      status: filters?.status || undefined,
      typeId: filters?.typeId || undefined,
    }
    const response = await apiClient.get<Room[]>('/rooms', { params })
    return response.data
  },

  getById: async (id: number): Promise<Room> => {
    const response = await apiClient.get<Room>(`/rooms/${id}`)
    return response.data
  },

  getAvailable: async (filters: AvailableRoomsSearchParams): Promise<Room[]> => {
    const params = {
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      keyword: filters.keyword || undefined,
      typeId: filters.typeId || undefined,
    }
    const response = await apiClient.get<Room[]>('/rooms/available', { params })
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
