import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Modal } from '../../../components/ui'
import type { Booking, UpdateBookingDetailsRequest } from '../../../types'

const bookingDetailsSchema = z.object({
  discount: z.coerce.number().min(0, 'Discount cannot be negative').default(0),
  note: z.string().max(500, 'Note must be 500 characters or less').optional().or(z.literal('')),
})

type BookingDetailsFormData = z.infer<typeof bookingDetailsSchema>

interface EditBookingDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
  onSubmit: (data: UpdateBookingDetailsRequest) => void
  loading?: boolean
}

export function EditBookingDetailsModal({ isOpen, onClose, booking, onSubmit, loading }: EditBookingDetailsModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingDetailsFormData>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: {
      discount: 0,
      note: '',
    },
  })

  useEffect(() => {
    reset({
      discount: booking?.discount ?? 0,
      note: booking?.note ?? '',
    })
  }, [booking, reset])

  if (!booking) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Booking #${booking.id}`} size="md">
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit({
            discount: data.discount || 0,
            note: data.note?.trim() || undefined,
          })
        )}
        className="space-y-4"
      >
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
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Internal booking note"
            {...register('note')}
          />
          {errors.note?.message ? <p className="mt-1 text-sm text-red-600">{errors.note.message}</p> : null}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Discount and booking note can only be edited before the booking is completed or cancelled.
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save Details
          </Button>
        </div>
      </form>
    </Modal>
  )
}
