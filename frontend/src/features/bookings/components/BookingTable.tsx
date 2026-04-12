import { Table, Button } from '../../../components/ui'
import { BookingStatusBadge } from './BookingStatusBadge'
import type { Booking } from '../../../types'

interface BookingTableProps {
  bookings: Booking[]
  loading?: boolean
  onViewDetails: (booking: Booking) => void
  onEditDetails: (booking: Booking) => void
  onUpdateStatus: (booking: Booking) => void
  onCancel: (booking: Booking) => void
  onCheckIn: (booking: Booking) => void
  onCheckOut: (booking: Booking) => void
}

export function BookingTable({ bookings, loading, onViewDetails, onEditDetails, onUpdateStatus, onCancel, onCheckIn, onCheckOut }: BookingTableProps) {
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
      render: (booking: Booking) => <span className="font-medium">#{booking.id}</span>,
    },
    {
      key: 'room',
      header: 'Room',
      render: (booking: Booking) => booking.room?.roomNumber ?? '-',
    },
    {
      key: 'guestName',
      header: 'Guest',
      render: (booking: Booking) => booking.guestName,
    },
    {
      key: 'discount',
      header: 'Discount',
      render: (booking: Booking) => `$${booking.discount.toLocaleString()}`,
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
          {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
            <Button variant="ghost" size="sm" onClick={() => onEditDetails(booking)}>
              Edit
            </Button>
          )}
          {booking.status === 'PENDING' && (
            <>
              <Button variant="ghost" size="sm" onClick={() => onUpdateStatus(booking)}>
                Status
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onCancel(booking)}>
                Cancel
              </Button>
            </>
          )}
          {booking.status === 'CONFIRMED' && !booking.checkedIn && (
            <>
              <Button variant="ghost" size="sm" onClick={() => onCheckIn(booking)}>
                Check-in
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onCancel(booking)}>
                Cancel
              </Button>
            </>
          )}
          {booking.status === 'CONFIRMED' && booking.checkedIn && (
            <Button variant="ghost" size="sm" onClick={() => onCheckOut(booking)}>
              Checkout
            </Button>
          )}
        </div>
      ),
    },
  ]

  return <Table columns={columns} data={bookings} keyExtractor={(booking) => booking.id} loading={loading} emptyMessage="No bookings found" />
}
