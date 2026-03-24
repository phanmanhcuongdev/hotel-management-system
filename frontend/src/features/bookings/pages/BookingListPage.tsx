import { useState, useMemo } from 'react'
import { Card, CardHeader, CardContent, Button } from '../../../components/ui'
import {
  BookingTable,
  CreateBookingModal,
  BookingDetailModal,
  UpdateStatusModal,
} from '../components'
import { useBookings, useCreateBooking, useUpdateBooking, useCancelBooking } from '../hooks/useBookings'
import { useRooms } from '../../rooms/hooks/useRooms'
import type { Booking, BookingStatus } from '../../../types'

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
    return bookings.filter(b => 
      b.id.toString().includes(searchValue) || 
      (b.room?.roomNumber ?? '').includes(searchValue)
    )
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
    if (selectedBooking) {
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
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black italic text-slate-900 tracking-tight uppercase">Quản lý Đặt phòng</h1>
          <p className="mt-1 text-slate-500 font-medium">Theo dõi, kiểm tra và xử lý các yêu cầu đặt phòng của khách hàng.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hệ thống ổn định</span>
          </div>
          <Button 
            onClick={() => setCreateModalOpen(true)}
            className="rounded-2xl bg-primary-600 hover:bg-primary-500 py-6 px-8 shadow-xl shadow-primary-200"
          >
            <span className="material-symbols-outlined mr-2">add_circle</span>
            Tạo Đơn Mới
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="border-none shadow-2xl shadow-slate-200/50 overflow-visible">
        <CardHeader 
          title="Danh sách Đơn đặt phòng" 
          subtitle={`Tổng số ${filteredBookings.length} đơn trong hệ thống`}
          icon="book_online"
          action={
            <div className="flex items-center gap-3">
              <div className="w-64 bg-slate-50 p-1 rounded-xl border border-slate-100 flex items-center px-3 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
                <input 
                  type="text" 
                  placeholder="Tìm mã đơn, số phòng..."
                  className="w-full bg-transparent border-none outline-none px-2 py-1.5 text-xs font-bold text-slate-900 placeholder:text-slate-400"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
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
            <BookingTable
              bookings={filteredBookings}
              loading={isLoading}
              onViewDetails={handleViewDetails}
              onUpdateStatus={handleUpdateStatus}
              onCancel={handleCancel}
            />
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
