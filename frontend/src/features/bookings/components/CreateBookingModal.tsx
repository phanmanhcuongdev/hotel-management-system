import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Select, Button } from '../../../components/ui'
import type { Room } from '../../../types'

const bookingSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  roomId: z.string().min(1, 'Room is required'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
}).refine((data) => {
  const checkIn = new Date(data.checkIn)
  const checkOut = new Date(data.checkOut)
  return checkOut > checkIn
}, {
  message: 'Check-out must be after check-in',
  path: ['checkOut'],
})

type BookingFormData = z.infer<typeof bookingSchema>

interface CreateBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { userId: number; roomId: number; checkIn: string; checkOut: string }) => void
  availableRooms: Room[]
  loading?: boolean
}

export function CreateBookingModal({ isOpen, onClose, onSubmit, availableRooms, loading }: CreateBookingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      userId: '',
      roomId: '',
      checkIn: '',
      checkOut: '',
    },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFormSubmit = (data: BookingFormData) => {
    onSubmit({
      userId: parseInt(data.userId),
      roomId: parseInt(data.roomId),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    })
  }

  const roomOptions = [
    { value: '', label: 'Select room' },
    ...availableRooms.map((room) => ({
      value: String(room.id),
      label: `${room.roomNumber} - ${room.type.name}`,
    })),
  ]

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Booking">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          id="userId"
          label="User ID"
          type="number"
          placeholder="Enter user ID"
          error={errors.userId?.message}
          {...register('userId')}
        />

        <Select
          id="roomId"
          label="Room"
          options={roomOptions}
          error={errors.roomId?.message}
          {...register('roomId')}
        />

        <Input
          id="checkIn"
          label="Check-in Date"
          type="date"
          error={errors.checkIn?.message}
          {...register('checkIn')}
        />

        <Input
          id="checkOut"
          label="Check-out Date"
          type="date"
          error={errors.checkOut?.message}
          {...register('checkOut')}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Booking
          </Button>
        </div>
      </form>
    </Modal>
  )
}
