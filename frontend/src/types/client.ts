import type { BookingStatus } from './booking'

export interface ClientSummary {
  id: number
  idCardNumber: string
  fullName: string
  address: string
  email?: string
  phoneNumber?: string
  description?: string
  needsReview: boolean
}

export interface ClientBookingHistoryItem {
  bookingId: number
  guestName: string
  roomId?: number
  roomNumber?: string
  checkIn: string
  checkOut: string
  status: BookingStatus
  checkedIn: boolean
}

export interface ClientDetail extends ClientSummary {
  bookingHistory: ClientBookingHistoryItem[]
}

export interface CreateClientRequest {
  idCardNumber: string
  fullName: string
  address: string
  email?: string
  phoneNumber?: string
  description?: string
}

export type UpdateClientRequest = CreateClientRequest
