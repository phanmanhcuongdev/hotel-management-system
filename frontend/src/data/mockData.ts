import type { Room, Booking } from '../types'

export const mockRooms: Room[] = [
  // Floor 1
  { id: 1, roomNumber: '101', status: 'OCCUPIED', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 2, roomNumber: '102', status: 'AVAILABLE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 3, roomNumber: '103', status: 'OCCUPIED', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 4, roomNumber: '104', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 5, roomNumber: '105', status: 'MAINTENANCE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 6, roomNumber: '106', status: 'AVAILABLE', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },

  // Floor 2
  { id: 7, roomNumber: '201', status: 'OCCUPIED', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 8, roomNumber: '202', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 9, roomNumber: '203', status: 'OCCUPIED', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },
  { id: 10, roomNumber: '204', status: 'AVAILABLE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 11, roomNumber: '205', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 12, roomNumber: '206', status: 'OCCUPIED', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },

  // Floor 3
  { id: 13, roomNumber: '301', status: 'AVAILABLE', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },
  { id: 14, roomNumber: '302', status: 'OCCUPIED', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },
  { id: 15, roomNumber: '303', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 16, roomNumber: '304', status: 'MAINTENANCE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 17, roomNumber: '305', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 18, roomNumber: '306', status: 'OCCUPIED', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
]

export const mockBookings: Record<number, { guestName: string; checkIn: string; checkOut: string; company?: string; price: number }> = {
  1: { guestName: 'John Smith', checkIn: '2024-02-20T14:00', checkOut: '2024-02-24T12:00', price: 400 },
  3: { guestName: 'Emily Johnson', checkIn: '2024-02-22T15:30', checkOut: '2024-02-25T11:00', company: 'Tech Corp Inc.', price: 450 },
  7: { guestName: 'Michael Brown', checkIn: '2024-02-21T16:00', checkOut: '2024-02-23T12:00', price: 300 },
  9: { guestName: 'Sarah Williams', checkIn: '2024-02-19T12:00', checkOut: '2024-02-26T12:00', company: 'Global Solutions', price: 1750 },
  12: { guestName: 'David Lee', checkIn: '2024-02-23T14:00', checkOut: '2024-02-27T11:00', price: 1000 },
  14: { guestName: 'Jennifer Davis', checkIn: '2024-02-20T13:00', checkOut: '2024-02-22T12:00', company: 'StartUp Labs', price: 500 },
  18: { guestName: 'Robert Wilson', checkIn: '2024-02-24T15:00', checkOut: '2024-02-25T11:00', price: 100 },
}

export const mockBookingsList: Booking[] = [
  { id: 1, userId: 101, room: { id: 1, roomNumber: '101' }, checkIn: '2024-02-20', checkOut: '2024-02-24', status: 'CONFIRMED' },
  { id: 2, userId: 102, room: { id: 3, roomNumber: '103' }, checkIn: '2024-02-22', checkOut: '2024-02-25', status: 'CONFIRMED' },
  { id: 3, userId: 103, room: { id: 7, roomNumber: '201' }, checkIn: '2024-02-21', checkOut: '2024-02-23', status: 'CONFIRMED' },
  { id: 4, userId: 104, room: { id: 9, roomNumber: '203' }, checkIn: '2024-02-19', checkOut: '2024-02-26', status: 'CONFIRMED' },
  { id: 5, userId: 105, room: { id: 12, roomNumber: '206' }, checkIn: '2024-02-23', checkOut: '2024-02-27', status: 'PENDING' },
  { id: 6, userId: 106, room: { id: 14, roomNumber: '302' }, checkIn: '2024-02-20', checkOut: '2024-02-22', status: 'COMPLETED' },
  { id: 7, userId: 107, room: { id: 18, roomNumber: '306' }, checkIn: '2024-02-24', checkOut: '2024-02-25', status: 'PENDING' },
  { id: 8, userId: 108, room: { id: 2, roomNumber: '102' }, checkIn: '2024-02-28', checkOut: '2024-03-02', status: 'PENDING' },
  { id: 9, userId: 109, room: { id: 4, roomNumber: '104' }, checkIn: '2024-02-25', checkOut: '2024-02-27', status: 'CANCELLED' },
]
