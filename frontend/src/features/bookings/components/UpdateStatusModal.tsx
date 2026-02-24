import { useState } from 'react'
import { Modal, Select, Button } from '../../../components/ui'
import type { Booking, BookingStatus } from '../../../types'

interface UpdateStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (status: BookingStatus) => void
  booking: Booking | null
  loading?: boolean
}

const statusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

export function UpdateStatusModal({ isOpen, onClose, onSubmit, booking, loading }: UpdateStatusModalProps) {
  const [status, setStatus] = useState<BookingStatus>(booking?.status || 'PENDING')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(status)
  }

  if (!booking) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Booking #${booking.id}`} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          id="status"
          label="New Status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as BookingStatus)}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Update Status
          </Button>
        </div>
      </form>
    </Modal>
  )
}
