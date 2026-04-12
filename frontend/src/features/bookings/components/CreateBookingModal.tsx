import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Select, Button } from '../../../components/ui'
import type { CreateBookingRequest } from '../../../types'
import { useAvailableRooms } from '../../rooms/hooks/useRooms'

const bookingSchema = z.object({
  guestName: z.string().min(1, 'Guest name is required'),
  phoneNumber: z.string().regex(/^[0-9+()\-\s]{8,20}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  discount: z.coerce.number().min(0, 'Discount cannot be negative').default(0),
  note: z.string().max(500, 'Note must be 500 characters or less').optional().or(z.literal('')),
  roomId: z.string().min(1, 'Room is required'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
}).refine((data) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkIn = new Date(data.checkIn)
  const checkOut = new Date(data.checkOut)
  return checkIn >= today && checkOut > checkIn
}, {
  message: 'Check-in must be today or later, and check-out must be after check-in',
  path: ['checkIn'],
})

type BookingFormData = z.infer<typeof bookingSchema>

interface CreateBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateBookingRequest) => void
  loading?: boolean
  searchEnabled?: boolean
}

export function CreateBookingModal({ isOpen, onClose, onSubmit, loading, searchEnabled = true }: CreateBookingModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: '',
      phoneNumber: '',
      email: '',
      discount: 0,
      note: '',
      roomId: '',
      checkIn: '',
      checkOut: '',
    },
  })

  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')
  const hasDateInputs = Boolean(checkIn && checkOut)
  const hasValidDateRange = (() => {
    if (!checkIn || !checkOut) {
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const parsedCheckIn = new Date(checkIn)
    const parsedCheckOut = new Date(checkOut)
    return parsedCheckIn >= today && parsedCheckOut > parsedCheckIn
  })()
  const searchParams = hasValidDateRange ? { checkIn, checkOut } : undefined
  const canSearch = Boolean(searchParams)
  const {
    data: availableRooms = [],
    isFetching: isSearchingRooms,
    error: availableRoomsError,
  } = useAvailableRooms(searchParams, {
    enabled: isOpen && searchEnabled && canSearch,
  })

  useEffect(() => {
    setValue('roomId', '')
  }, [checkIn, checkOut, setValue])

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFormSubmit = (data: BookingFormData) => {
    onSubmit({
      guestName: data.guestName,
      phoneNumber: data.phoneNumber,
      email: data.email || undefined,
      discount: data.discount || 0,
      note: data.note?.trim() || undefined,
      roomId: parseInt(data.roomId),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    })
  }

  const roomOptions = useMemo(
    () => [
      { value: '', label: availableRooms.length > 0 ? 'Select room' : 'No available room found' },
      ...availableRooms.map((room) => ({
        value: String(room.id),
        label: `${room.roomNumber} - ${room.type.name}`,
      })),
    ],
    [availableRooms]
  )

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Booking" size="lg">
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
        <p className="-mt-2 text-xs text-slate-500">
          Phone number is used to match an existing client record. If none is found, the backend creates a minimal client profile automatically.
        </p>

        <Input
          id="email"
          label="Email (optional)"
          type="email"
          placeholder="Enter email address"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="discount"
            label="Booking Discount"
            type="number"
            min="0"
            step="0.01"
            error={errors.discount?.message}
            {...register('discount', { valueAsNumber: true })}
          />

          <div className="w-full">
            <label htmlFor="note" className="mb-1 block text-sm font-medium text-gray-700">
              Booking Note (optional)
            </label>
            <textarea
              id="note"
              rows={3}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Internal booking note"
              {...register('note')}
            />
            {errors.note?.message ? <p className="mt-1 text-sm text-red-600">{errors.note.message}</p> : null}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Available rooms for selected dates</h4>
              <p className="text-xs text-slate-500">Results come from backend availability checks, not the room&apos;s current status flag.</p>
            </div>
            <Button type="button" variant="secondary" disabled={!canSearch} loading={isSearchingRooms}>
              Search auto-runs
            </Button>
          </div>

          {availableRoomsError instanceof Error && (
            <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {availableRoomsError.message}
            </p>
          )}

          {!canSearch && (
            <p className="mt-3 text-sm text-slate-500">
              {hasDateInputs
                ? 'Enter a valid date range to load available rooms.'
                : 'Select check-in and check-out dates to load available rooms.'}
            </p>
          )}

          {canSearch && !isSearchingRooms && availableRooms.length === 0 && !(availableRoomsError instanceof Error) && (
            <p className="mt-3 text-sm text-slate-500">No rooms are available for the selected date range.</p>
          )}

          <div className="mt-4">
            <Select
              id="roomId"
              label="Room"
              options={roomOptions}
              disabled={!canSearch || isSearchingRooms || availableRooms.length === 0}
              error={errors.roomId?.message}
              {...register('roomId')}
            />
          </div>
        </div>

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
