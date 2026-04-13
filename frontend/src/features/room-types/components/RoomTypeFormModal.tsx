import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Input, Modal } from '../../../components/ui'
import type { RoomType } from '../../../types'
import type { CreateRoomTypeRequest, UpdateRoomTypeRequest } from '../../../api/roomTypes'

const roomTypeSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name must be 255 characters or less'),
  description: z.string().trim().max(500, 'Description must be 500 characters or less').optional().or(z.literal('')),
  price: z.coerce.number().positive('Price must be greater than zero'),
  capacity: z.coerce.number().int('Capacity must be a whole number').positive('Capacity must be greater than zero'),
})

type RoomTypeFormValues = z.infer<typeof roomTypeSchema>

interface RoomTypeFormModalProps {
  isOpen: boolean
  onClose: () => void
  roomType?: RoomType | null
  loading?: boolean
  onCreate: (data: CreateRoomTypeRequest) => void
  onUpdate: (data: UpdateRoomTypeRequest) => void
}

export function RoomTypeFormModal({ isOpen, onClose, roomType, loading, onCreate, onUpdate }: RoomTypeFormModalProps) {
  const isEditMode = !!roomType

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomTypeFormValues>({
    resolver: zodResolver(roomTypeSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      capacity: 2,
    },
  })

  useEffect(() => {
    if (!isOpen) {
      return
    }

    reset({
      name: roomType?.name ?? '',
      description: roomType?.description ?? '',
      price: roomType?.price ?? 0,
      capacity: roomType?.capacity ?? 2,
    })
  }, [isOpen, reset, roomType])

  const onSubmit = handleSubmit((values) => {
    const payload = {
      name: values.name.trim(),
      description: values.description?.trim() || undefined,
      price: values.price,
      capacity: values.capacity,
    }

    if (isEditMode) {
      onUpdate(payload)
      return
    }

    onCreate(payload)
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Edit Room Type' : 'Create Room Type'} size="lg">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <Input id="name" label="Name" error={errors.name?.message} {...register('name')} />

        <div className="w-full">
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('description')}
          />
          {errors.description?.message && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input id="price" label="Price Per Night" type="number" min="0.01" step="0.01" error={errors.price?.message} {...register('price')} />
          <Input id="capacity" label="Capacity" type="number" min="1" step="1" error={errors.capacity?.message} {...register('capacity')} />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" loading={loading}>
            {isEditMode ? 'Save Changes' : 'Create Room Type'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
