import { useEffect, useMemo, useState } from 'react'
import { Modal, Select, Button } from '../../../components/ui'
import type { Booking, BookingStatus } from '../../../types'

interface UpdateStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (status: BookingStatus) => void
  booking: Booking | null
  loading?: boolean
}

const TRANSITION_OPTIONS: Record<BookingStatus, { value: BookingStatus; label: string }[]> = {
  PENDING: [
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ],
  CONFIRMED: [
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ],
  CANCELLED: [],
  COMPLETED: [],
}

export function UpdateStatusModal({ isOpen, onClose, onSubmit, booking, loading }: UpdateStatusModalProps) {
  const [status, setStatus] = useState<BookingStatus>('CONFIRMED')

  const statusOptions = useMemo(() => {
    if (!booking) {
      return []
    }

    return TRANSITION_OPTIONS[booking.status]
  }, [booking])

  useEffect(() => {
    if (!booking) {
      return
    }

    const nextStatus = TRANSITION_OPTIONS[booking.status][0]?.value ?? booking.status
    setStatus(nextStatus)
  }, [booking])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (statusOptions.length > 0) {
      onSubmit(status)
    }
  }

  if (!booking) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Booking #${booking.id}`} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        {statusOptions.length > 0 ? (
          <Select
            id="status"
            label="New Status"
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value as BookingStatus)}
          />
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Booking nay khong con transition hop le de cap nhat.
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading} disabled={statusOptions.length === 0}>
            Update Status
          </Button>
        </div>
      </form>
    </Modal>
  )
}
