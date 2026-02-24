import { RoomCard } from './RoomCard'
import type { Room } from '../../../types'

interface RoomWithBooking extends Room {
  currentBooking?: {
    guestName: string
    checkIn: string
    checkOut: string
    company?: string
    price: number
  }
  floor?: number
}

interface RoomGridViewProps {
  rooms: RoomWithBooking[]
  loading?: boolean
  groupBy: 'floor' | 'type' | 'none'
  onRoomClick?: (room: Room) => void
}

function groupRoomsByFloor(rooms: RoomWithBooking[]): Record<string, RoomWithBooking[]> {
  return rooms.reduce((acc, room) => {
    // Extract floor from room number (e.g., 501 -> floor 5, 101 -> floor 1)
    const floor = room.floor || Math.floor(parseInt(room.roomNumber) / 100) || 1
    const key = `Floor ${floor}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(room)
    return acc
  }, {} as Record<string, RoomWithBooking[]>)
}

function groupRoomsByType(rooms: RoomWithBooking[]): Record<string, RoomWithBooking[]> {
  return rooms.reduce((acc, room) => {
    const key = room.type.name
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(room)
    return acc
  }, {} as Record<string, RoomWithBooking[]>)
}

export function RoomGridView({ rooms, loading, groupBy, onRoomClick }: RoomGridViewProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        No rooms found
      </div>
    )
  }

  const groupedRooms = groupBy === 'floor'
    ? groupRoomsByFloor(rooms)
    : groupBy === 'type'
    ? groupRoomsByType(rooms)
    : { 'All Rooms': rooms }

  return (
    <div className="space-y-6">
      {Object.entries(groupedRooms).map(([groupName, groupRooms]) => (
        <div key={groupName}>
          {/* Group header */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {groupName} <span className="text-gray-400 font-normal">({groupRooms.length})</span>
          </h3>

          {/* Room grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {groupRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                booking={room.currentBooking}
                onClick={() => onRoomClick?.(room)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
