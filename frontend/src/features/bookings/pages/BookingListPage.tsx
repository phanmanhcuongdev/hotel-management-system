import { useState } from 'react'
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

  const { data: bookings = [], isLoading } = useBookings()
  const { data: availableRooms = [] } = useRooms('AVAILABLE')
  const createBooking = useCreateBooking()
  const updateBooking = useUpdateBooking()
  const cancelBooking = useCancelBooking()

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setDetailModalOpen(true)
  }

  const handleUpdateStatus = (booking: Booking) => {
    setSelectedBooking(booking)
    setUpdateModalOpen(true)
  }

  const handleCancel = (booking: Booking) => {
    if (confirm(`Are you sure you want to cancel booking #${booking.id}?`)) {
      cancelBooking.mutate(booking.id)
    }
  }

  const handleCreateSubmit = (data: { userId: number; roomId: number; checkIn: string; checkOut: string }) => {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
        <Button onClick={() => setCreateModalOpen(true)}>New Booking</Button>
      </div>

      <Card>
        <CardHeader title="All Bookings" />
        <CardContent className="p-0">
          <BookingTable
            bookings={bookings}
            loading={isLoading}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateStatus}
            onCancel={handleCancel}
          />
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
