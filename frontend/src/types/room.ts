export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'

export interface RoomType {
  id: number
  name: string
  price: number
  capacity: number
}

export interface Room {
  id: number
  roomNumber: string
  status: RoomStatus
  type: RoomType
}

export interface CreateRoomRequest {
  roomNumber: string
  roomTypeId: number
  status: RoomStatus
}

export interface UpdateRoomRequest {
  roomNumber?: string
  roomTypeId?: number
  status?: RoomStatus
}
