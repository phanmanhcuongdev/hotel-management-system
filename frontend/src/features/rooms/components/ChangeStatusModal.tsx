import { Modal, Select, Button } from '../../../components/ui'
import type { Room, RoomStatus } from '../../../types'
import { useState } from 'react'

interface ChangeStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (status: RoomStatus) => void
  room: Room | null
  loading?: boolean
}

const statusOptions = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'OCCUPIED', label: 'Occupied' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
]

export function ChangeStatusModal({ isOpen, onClose, onSubmit, room, loading }: ChangeStatusModalProps) {
  const [status, setStatus] = useState<RoomStatus>(room?.status || 'AVAILABLE')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(status)
  }

  if (!room) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Change Status - Room ${room.roomNumber}`} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          id="status"
          label="New Status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as RoomStatus)}
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
