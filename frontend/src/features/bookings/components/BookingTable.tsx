import { Table, Button } from '../../../components/ui'
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
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const columns = [
    {
      key: 'id',
      header: 'Booking ID',
      render: (booking: Booking) => (
        <span className="font-medium">#{booking.id}</span>
      ),
    },
    {
      key: 'room',
      header: 'Room',
      render: (booking: Booking) => booking.room.roomNumber,
    },
    {
      key: 'userId',
      header: 'User ID',
      render: (booking: Booking) => `#${booking.userId}`,
    },
    {
      key: 'checkIn',
      header: 'Check In',
      render: (booking: Booking) => formatDate(booking.checkIn),
    },
    {
      key: 'checkOut',
      header: 'Check Out',
      render: (booking: Booking) => formatDate(booking.checkOut),
    },
    {
      key: 'status',
      header: 'Status',
      render: (booking: Booking) => <BookingStatusBadge status={booking.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (booking: Booking) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onViewDetails(booking)}>
            Details
          </Button>
          {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
            <>
              <Button variant="ghost" size="sm" onClick={() => onUpdateStatus(booking)}>
                Update
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onCancel(booking)}>
                Cancel
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={bookings}
      keyExtractor={(booking) => booking.id}
      loading={loading}
      emptyMessage="No bookings found"
    />
  )
}
