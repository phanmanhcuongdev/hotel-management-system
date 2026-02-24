import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Select, Button } from '../../../components/ui'
import type { Room } from '../../../types'

const roomSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required'),
  roomTypeId: z.string().min(1, 'Room type is required'),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']),
})

type RoomFormData = z.infer<typeof roomSchema>

interface RoomFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RoomFormData) => void
  room?: Room
  loading?: boolean
}

const roomTypes = [
  { value: '1', label: 'Standard' },
  { value: '2', label: 'Deluxe' },
  { value: '3', label: 'Suite' },
]

const statusOptions = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'OCCUPIED', label: 'Occupied' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
]

export function RoomFormModal({ isOpen, onClose, onSubmit, room, loading }: RoomFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: room
      ? {
          roomNumber: room.roomNumber,
          roomTypeId: String(room.type.id),
          status: room.status,
        }
      : {
          roomNumber: '',
          roomTypeId: '',
          status: 'AVAILABLE',
        },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={room ? 'Edit Room' : 'Add New Room'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="roomNumber"
          label="Room Number"
          placeholder="e.g., 101"
          error={errors.roomNumber?.message}
          {...register('roomNumber')}
        />

        <Select
          id="roomTypeId"
          label="Room Type"
          options={[{ value: '', label: 'Select type' }, ...roomTypes]}
          error={errors.roomTypeId?.message}
          {...register('roomTypeId')}
        />

        <Select
          id="status"
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register('status')}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {room ? 'Save Changes' : 'Add Room'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
