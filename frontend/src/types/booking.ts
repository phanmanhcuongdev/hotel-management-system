export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface RoomShort {
  id: number
  roomNumber: string
  typeName: string
}

export interface Booking {
  id: number
  userId: number
  room: RoomShort | null
  checkIn: string
  checkOut: string
  status: BookingStatus
  guestName?: string
  phoneNumber?: string
  email?: string
}

export interface CreateBookingRequest {
  userId?: number
  guestName?: string
  phoneNumber?: string
  email?: string
  roomId: number
  checkIn: string
  checkOut: string
}

export interface UpdateBookingRequest {
  status: BookingStatus
}
