import { apiClient } from './client'
import type { Booking, BookingStatus, CreateBookingRequest, UpdateBookingDetailsRequest, UpdateBookingRequest } from '../types'

export interface BookingsSearchParams {
  keyword?: string
  status?: BookingStatus
  roomId?: number
  guestName?: string
  phoneNumber?: string
  checkInDate?: string
  checkOutDate?: string
}

export const bookingsApi = {
  getAll: async (filters?: BookingsSearchParams): Promise<Booking[]> => {
    const params = {
      keyword: filters?.keyword || undefined,
      status: filters?.status || undefined,
      roomId: filters?.roomId || undefined,
      guestName: filters?.guestName || undefined,
      phoneNumber: filters?.phoneNumber || undefined,
      checkInDate: filters?.checkInDate || undefined,
      checkOutDate: filters?.checkOutDate || undefined,
    }

    const response = await apiClient.get<Booking[]>('/bookings', { params })
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

  checkIn: async (id: number): Promise<Booking> => {
    const response = await apiClient.post<Booking>(`/bookings/${id}/check-in`)
    return response.data
  },

  checkOut: async (id: number): Promise<Booking> => {
    const response = await apiClient.post<Booking>(`/bookings/${id}/checkout`)
    return response.data
  },

  update: async (id: number, data: UpdateBookingRequest): Promise<Booking> => {
    const response = await apiClient.patch<Booking>(`/bookings/${id}/status`, data)
    return response.data
  },

  updateDetails: async (id: number, data: UpdateBookingDetailsRequest): Promise<Booking> => {
    const response = await apiClient.patch<Booking>(`/bookings/${id}`, data)
    return response.data
  },

  cancel: async (id: number): Promise<Booking> => {
    const response = await apiClient.patch<Booking>(`/bookings/${id}/status`, { status: 'CANCELLED' })
    return response.data
  },
}
