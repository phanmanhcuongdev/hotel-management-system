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

export interface BookingStaff {
  id: number
  username: string
  fullName: string
}

export interface Booking {
  id: number
  guestName: string
  phoneNumber: string
  email?: string
  clientId?: number
  discount: number
  note?: string | null
  bookedBy?: BookingStaff | null
  room: RoomShort | null
  checkIn: string
  checkOut: string
  status: BookingStatus
  checkedIn: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateBookingRequest {
  guestName: string
  phoneNumber: string
  email?: string
  discount?: number
  note?: string
  roomId: number
  checkIn: string
  checkOut: string
}

export interface UpdateBookingRequest {
  status: BookingStatus
}

export interface UpdateBookingDetailsRequest {
  discount?: number
  note?: string
}
