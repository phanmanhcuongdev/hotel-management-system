import { useMemo, useState } from 'react'
import { Button, Card, CardContent, CardHeader } from '../../../components/ui'
import type { Booking, BookingStatus } from '../../../types'
import { useRooms } from '../../rooms/hooks/useRooms'
import { BookingDetailModal, BookingTable, CreateBookingModal, UpdateStatusModal } from '../components'
import { useBookings, useCancelBooking, useCreateBooking, useUpdateBooking } from '../hooks/useBookings'

export default function BookingListPage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const { data: bookings = [], isLoading } = useBookings()
  const { data: availableRooms = [] } = useRooms('AVAILABLE')
  const createBooking = useCreateBooking()
  const updateBooking = useUpdateBooking()
  const cancelBooking = useCancelBooking()

  const filteredBookings = useMemo(() => {
    if (!searchValue) return bookings

    return bookings.filter((booking) => booking.id.toString().includes(searchValue) || (booking.room?.roomNumber ?? '').includes(searchValue))
  }, [bookings, searchValue])

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setDetailModalOpen(true)
  }

  const handleUpdateStatus = (booking: Booking) => {
    setSelectedBooking(booking)
    setUpdateModalOpen(true)
  }

  const handleCancel = (booking: Booking) => {
    if (confirm(`Bạn có chắc chắn muốn hủy đơn đặt phòng #${booking.id}?`)) {
      cancelBooking.mutate(booking.id)
    }
  }

  const handleCreateSubmit = (data: { guestName: string; phoneNumber: string; email?: string; roomId: number; checkIn: string; checkOut: string }) => {
    createBooking.mutate(data, {
      onSuccess: () => {
        setCreateModalOpen(false)
      },
    })
  }

  const handleStatusSubmit = (status: BookingStatus) => {
    if (!selectedBooking) {
      return
    }

    updateBooking.mutate(
      { id: selectedBooking.id, data: { status } },
      {
        onSuccess: () => {
          setUpdateModalOpen(false)
          setSelectedBooking(null)
        },
      }
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Quản lý đặt phòng</h1>
          <p className="mt-1 font-medium text-slate-500">Theo dõi, kiểm tra và xử lý các yêu cầu đặt phòng của khách hàng.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-2 shadow-sm sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hệ thống ổn định</span>
          </div>
          <Button onClick={() => setCreateModalOpen(true)} className="rounded-2xl bg-primary-600 px-8 py-6 shadow-xl shadow-primary-200 hover:bg-primary-500">
            <span className="material-symbols-outlined mr-2">add_circle</span>
            Tạo đơn mới
          </Button>
        </div>
      </div>

      <Card className="overflow-visible border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="Danh sách đơn đặt phòng"
          subtitle={`Tổng số ${filteredBookings.length} đơn trong hệ thống`}
          icon="book_online"
          action={
            <div className="flex items-center gap-3">
              <div className="group flex w-64 items-center rounded-xl border border-slate-100 bg-slate-50 px-3 p-1 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100">
                <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
                <input
                  type="text"
                  placeholder="Tìm mã đơn, số phòng..."
                  className="w-full border-none bg-transparent px-2 py-1.5 text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </div>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl p-0 hover:bg-slate-50">
                <span className="material-symbols-outlined">filter_list</span>
              </Button>
            </div>
          }
        />
        <CardContent noPadding>
          <div className="min-h-[400px]">
            <BookingTable bookings={filteredBookings} loading={isLoading} onViewDetails={handleViewDetails} onUpdateStatus={handleUpdateStatus} onCancel={handleCancel} />
          </div>
        </CardContent>
      </Card>

      <CreateBookingModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        availableRooms={availableRooms}
        loading={createBooking.isPending}
      />

      <BookingDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedBooking(null)
        }}
        booking={selectedBooking}
      />

      <UpdateStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false)
          setSelectedBooking(null)
        }}
        onSubmit={handleStatusSubmit}
        booking={selectedBooking}
        loading={updateBooking.isPending}
      />
    </div>
  )
}
