import { Modal, Button } from '../../../components/ui'
import { BookingStatusBadge } from './BookingStatusBadge'
import type { Booking } from '../../../types'

interface BookingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
}

export function BookingDetailModal({ isOpen, onClose, booking }: BookingDetailModalProps) {
  if (!booking) return null

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Booking #${booking.id}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="mt-1">
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Room</p>
            <p className="mt-1 font-medium">{booking.room.roomNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Check-in</p>
            <p className="mt-1 font-medium">{formatDate(booking.checkIn)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Check-out</p>
            <p className="mt-1 font-medium">{formatDate(booking.checkOut)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="mt-1 font-medium">{calculateNights()} night(s)</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="mt-1 font-medium">#{booking.userId}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
