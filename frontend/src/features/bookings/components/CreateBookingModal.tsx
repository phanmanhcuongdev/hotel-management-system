import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Select, Button } from '../../../components/ui'
import type { Room } from '../../../types'
import type { CreateBookingRequest } from '../../../types'

const bookingSchema = z.object({
  guestName: z.string().min(1, 'Guest name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
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
  onSubmit: (data: CreateBookingRequest) => void
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
      guestName: '',
      phoneNumber: '',
      email: '',
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
      guestName: data.guestName,
      phoneNumber: data.phoneNumber,
      email: data.email || undefined,
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
          id="guestName"
          label="Guest Name"
          type="text"
          placeholder="Enter guest name"
          error={errors.guestName?.message}
          {...register('guestName')}
        />

        <Input
          id="phoneNumber"
          label="Phone Number"
          type="text"
          placeholder="Enter phone number"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />

        <Input
          id="email"
          label="Email (optional)"
          type="email"
          placeholder="Enter email address"
          error={errors.email?.message}
          {...register('email')}
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
