export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface RoomTypeShort {
  id: number
  name: string
}

export interface RoomShort {
  id: number
  roomNumber: string
  type?: RoomTypeShort
}

export interface Booking {
  id: number
  guestName: string
  phoneNumber: string
  email?: string
  room: RoomShort | null
  checkIn: string
  checkOut: string
  status: BookingStatus
  createdAt?: string
  updatedAt?: string
}

export interface CreateBookingRequest {
  guestName: string
  phoneNumber: string
  email?: string
  roomId: number
  checkIn: string
  checkOut: string
}

export interface UpdateBookingRequest {
  status: BookingStatus
}
