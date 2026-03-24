import { Button } from '../../../components/ui'
import { BookingStatusBadge } from './BookingStatusBadge'
import type { Booking } from '../../../types'

interface BookingTableProps {
  bookings: Booking[]
  loading?: boolean
  onViewDetails: (booking: Booking) => void
  onUpdateStatus: (booking: Booking) => void
  onCancel: (booking: Booking) => void
}

export function BookingTable({ bookings, loading, onViewDetails, onUpdateStatus, onCancel }: BookingTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getRoomNumber = (booking: Booking) => booking.room?.roomNumber ?? '---'
  const getRoomTypeName = (booking: Booking) => booking.room?.roomType?.name ?? booking.room?.type?.name ?? 'Chua co loai phong'

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="h-12 w-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-sm animate-pulse uppercase tracking-widest">Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-300">
        <span className="material-symbols-outlined text-[64px] opacity-20 mb-4">analytics</span>
        <p className="font-black italic uppercase tracking-tighter text-xl">Không tìm thấy dữ liệu</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50/50 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            <th className="px-8 py-5">Mã Đơn</th>
            <th className="px-8 py-5">Thông Tin Phòng</th>
            <th className="px-8 py-5">Thời Gian Lưu Trú</th>
            <th className="px-8 py-5">Trạng Thái</th>
            <th className="px-8 py-5 text-right">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {bookings.map((booking) => (
            <tr key={booking.id} className="group hover:bg-slate-50/50 transition-all duration-200">
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-mono font-black text-slate-900 text-base italic">#{booking.id}</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-primary-400 font-black italic shadow-lg shadow-slate-200">
                    {getRoomNumber(booking)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate uppercase tracking-tight">Phòng {getRoomNumber(booking)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{getRoomTypeName(booking)}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="material-symbols-outlined text-[14px] text-emerald-500">login</span>
                    {formatDate(booking.checkIn)}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="material-symbols-outlined text-[14px] text-rose-500">logout</span>
                    {formatDate(booking.checkOut)}
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <BookingStatusBadge status={booking.status} />
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(booking)}
                    className="h-10 w-10 p-0 rounded-xl hover:bg-white shadow-sm border border-transparent hover:border-slate-100"
                  >
                    <span className="material-symbols-outlined text-[20px] text-slate-600">visibility</span>
                  </Button>
                  {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onUpdateStatus(booking)}
                        className="h-10 w-10 p-0 rounded-xl hover:bg-white shadow-sm border border-transparent hover:border-slate-100"
                      >
                        <span className="material-symbols-outlined text-[20px] text-blue-600">edit_square</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onCancel(booking)}
                        className="h-10 w-10 p-0 rounded-xl hover:bg-rose-50 shadow-sm border border-transparent hover:border-rose-100"
                      >
                        <span className="material-symbols-outlined text-[20px] text-rose-600">cancel</span>
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
