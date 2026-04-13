import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Input, Modal } from '../../../components/ui'
import type { ClientSummary, CreateClientRequest, UpdateClientRequest } from '../../../types'

const clientSchema = z.object({
  idCardNumber: z.string().trim().min(1, 'ID card number is required').max(50, 'ID card number must be 50 characters or less'),
  fullName: z.string().trim().min(1, 'Full name is required').max(255, 'Full name must be 255 characters or less'),
  address: z.string().trim().min(1, 'Address is required').max(255, 'Address must be 255 characters or less'),
  email: z.string().trim().email('Email must be valid').max(255, 'Email must be 255 characters or less').optional().or(z.literal('')),
  phoneNumber: z.string().trim().regex(/^[0-9+()\-\s]*$/, 'Phone number has invalid format').max(20, 'Phone number must be 20 characters or less').optional().or(z.literal('')),
  description: z.string().trim().max(255, 'Description must be 255 characters or less').optional().or(z.literal('')),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: CreateClientRequest) => void
  onUpdate: (data: UpdateClientRequest) => void
  loading: boolean
  client?: ClientSummary | null
}

export function ClientFormModal({ isOpen, onClose, onCreate, onUpdate, loading, client }: ClientFormModalProps) {
  const isEditMode = !!client

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      idCardNumber: '',
      fullName: '',
      address: '',
      email: '',
      phoneNumber: '',
      description: '',
    },
  })

  useEffect(() => {
    if (!isOpen) {
      return
    }

    reset({
      idCardNumber: client?.idCardNumber ?? '',
      fullName: client?.fullName ?? '',
      address: client?.address ?? '',
      email: client?.email ?? '',
      phoneNumber: client?.phoneNumber ?? '',
      description: client?.description ?? '',
    })
  }, [client, isOpen, reset])

  const onSubmit = handleSubmit((values) => {
    const payload = {
      idCardNumber: values.idCardNumber.trim(),
      fullName: values.fullName.trim(),
      address: values.address.trim(),
      email: values.email?.trim() || undefined,
      phoneNumber: values.phoneNumber?.trim() || undefined,
      description: values.description?.trim() || undefined,
    }

    if (isEditMode) {
      onUpdate(payload)
      return
    }

    onCreate(payload)
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Edit Client' : 'Create Client'} size="lg">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <Input id="fullName" label="Full Name" error={errors.fullName?.message} {...register('fullName')} />
          <Input id="idCardNumber" label="ID Card Number" error={errors.idCardNumber?.message} {...register('idCardNumber')} />
        </div>

        <Input id="address" label="Address" error={errors.address?.message} {...register('address')} />

        <div className="grid gap-4 md:grid-cols-2">
          <Input id="phoneNumber" label="Phone Number" error={errors.phoneNumber?.message} {...register('phoneNumber')} />
          <Input id="email" label="Email" error={errors.email?.message} {...register('email')} />
        </div>

        <div className="w-full">
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('description')}
          />
          {errors.description?.message && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" loading={loading}>
            {isEditMode ? 'Save Changes' : 'Create Client'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
