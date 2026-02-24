import { apiClient } from './client'
import type { Booking, CreateBookingRequest, UpdateBookingRequest } from '../types'

export const bookingsApi = {
  getAll: async (): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>('/bookings')
    return response.data
  },

  getById: async (id: number): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/${id}`)
    return response.data
  },

  create: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', data)
    return response.data
  },

  update: async (id: number, data: UpdateBookingRequest): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}`, data)
    return response.data
  },

  cancel: async (id: number): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}`, { status: 'CANCELLED' })
    return response.data
  },
}
