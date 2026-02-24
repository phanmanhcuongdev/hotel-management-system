export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface RoomShort {
  id: number
  roomNumber: string
}

export interface Booking {
  id: number
  userId: number
  room: RoomShort
  checkIn: string
  checkOut: string
  status: BookingStatus
}

export interface CreateBookingRequest {
  userId: number
  roomId: number
  checkIn: string
  checkOut: string
}

export interface UpdateBookingRequest {
  status: BookingStatus
}
