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

const statusConfigs: Record<string, { bg: string; iconBg: string; text: string; label: string; icon: string; gradient: string }> = {
  AVAILABLE: {
    bg: 'bg-emerald-50/50',
    iconBg: 'bg-emerald-500',
    text: 'text-emerald-700',
    label: 'Sẵn sàng',
    icon: 'check_circle',
    gradient: 'from-emerald-500 to-teal-400',
  },
  OCCUPIED: {
    bg: 'bg-rose-50/50',
    iconBg: 'bg-rose-500',
    text: 'text-rose-700',
    label: 'Đang ở',
    icon: 'person_pin',
    gradient: 'from-rose-500 to-orange-400',
  },
  MAINTENANCE: {
    bg: 'bg-slate-50/50',
    iconBg: 'bg-slate-500',
    text: 'text-slate-700',
    label: 'Bảo trì',
    icon: 'build',
    gradient: 'from-slate-600 to-slate-400',
  },
}

export function RoomCard({ room, booking, onClick }: RoomCardProps) {
  const config = statusConfigs[room.status] || statusConfigs.AVAILABLE
  const isOccupied = room.status === 'OCCUPIED'
  const roomTypeName = room.type?.name ?? 'Room'
  const floor = Number.parseInt(room.roomNumber, 10)

  return (
    <div
      onClick={onClick}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${config.bg}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm ${config.text}`}>
          <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${config.iconBg}`} />
          {config.label}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{roomTypeName}</span>
      </div>

      <div className="mb-6 flex items-end gap-3">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-slate-200 transition-transform duration-300 group-hover:scale-110 ${config.gradient}`}>
          <span className="text-2xl font-black italic">{room.roomNumber}</span>
        </div>
        <div className="mb-1">
          <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Tầng {Number.isNaN(floor) ? 1 : Math.floor(floor / 100) || 1}</p>
          <p className="text-sm font-black leading-none text-slate-900">{roomTypeName}</p>
        </div>
      </div>

      <div className="mt-auto">
        {isOccupied && booking ? (
          <div className="rounded-2xl border border-white bg-white/60 p-3 backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
              <span className="truncate text-xs font-bold text-slate-900">{booking.guestName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-slate-400">calendar_today</span>
              <span className="text-[10px] font-medium text-slate-500">Out: {booking.checkOut}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 py-4">
            <span className="material-symbols-outlined text-[20px] text-slate-300">add_circle</span>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/5">
        <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">Xem chi tiết</div>
        </div>
      </div>
    </div>
  )
}
