import type { Room } from '../../../types'

interface RoomCardProps {
  room: Room
  booking?: {
    guestName: string
    checkIn: string
    checkOut: string
    company?: string
    price: number
  }
  onClick?: () => void
}

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  AVAILABLE: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-700' },
  OCCUPIED: { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-700' },
  MAINTENANCE: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-700' },
  DIRTY: { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-700' },
  RESERVED: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-700' },
}

const typeAbbreviations: Record<string, string> = {
  'Standard': 'STD',
  'Deluxe': 'DLX',
  'Suite': 'STE',
  'Double': 'DBL',
  'Single': 'SGL',
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const mins = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month} ${hours}:${mins}`
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US').format(price)
}

export function RoomCard({ room, booking, onClick }: RoomCardProps) {
  const colors = statusColors[room.status] || statusColors.AVAILABLE
  const typeAbbr = typeAbbreviations[room.type.name] || room.type.name.substring(0, 3).toUpperCase()
  const isOccupied = room.status === 'OCCUPIED' && booking

  return (
    <div
      onClick={onClick}
      className={`flex bg-white rounded-lg border-2 ${colors.border} overflow-hidden cursor-pointer hover:shadow-lg transition-shadow min-h-[100px]`}
    >
      {/* Left sidebar - Room info */}
      <div className={`${colors.bg} w-14 flex flex-col items-center justify-center text-white py-2 flex-shrink-0`}>
        <span className="text-[10px] font-medium opacity-90">{typeAbbr}</span>
        <span className="text-xl font-bold">{room.roomNumber}</span>
        <div className="mt-1">
          <svg className="w-4 h-4 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Right content - Booking info */}
      <div className="flex-1 p-3 min-w-0">
        {isOccupied ? (
          <>
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-semibold text-gray-800 truncate">{booking.guestName}</span>
            </div>
            <p className="text-xs text-gray-500 mb-1">
              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
            </p>
            {booking.company && (
              <p className="text-xs text-gray-400 truncate mb-1">{booking.company}</p>
            )}
            <p className={`text-sm font-semibold ${colors.text}`}>
              ${formatPrice(booking.price)}
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-sm text-gray-400">
              {room.status === 'AVAILABLE' ? 'Available' :
               room.status === 'MAINTENANCE' ? 'Maintenance' : 'Unavailable'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
