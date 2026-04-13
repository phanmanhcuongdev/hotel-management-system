import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Modal } from '../../../components/ui'
import type { CreateServiceRequest, ServiceCatalogItem } from '../../../types'

const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(255, 'Service name is too long'),
  unit: z.string().min(1, 'Unit is required').max(255, 'Unit is too long'),
  price: z.coerce.number().gt(0, 'Price must be greater than zero'),
})

type ServiceFormData = z.infer<typeof serviceSchema>

interface ServiceFormModalProps {
  isOpen: boolean
  onClose: () => void
  service: ServiceCatalogItem | null
  onCreate: (data: CreateServiceRequest) => void
  onUpdate: (data: CreateServiceRequest) => void
  loading?: boolean
}

export function ServiceFormModal({ isOpen, onClose, service, onCreate, onUpdate, loading }: ServiceFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      unit: '',
      price: 0,
    },
  })

  useEffect(() => {
    reset({
      name: service?.name ?? '',
      unit: service?.unit ?? '',
      price: service?.price ?? 0,
    })
  }, [service, reset])

  const submitLabel = service ? 'Save Service' : 'Create Service'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service ? `Edit Service #${service.id}` : 'Create Service'} size="md">
      <form
        onSubmit={handleSubmit((data) => {
          const payload: CreateServiceRequest = {
            name: data.name.trim(),
            unit: data.unit.trim(),
            price: data.price,
          }

          if (service) {
            onUpdate(payload)
            return
          }

          onCreate(payload)
        })}
        className="space-y-4"
      >
        <Input id="name" label="Service Name" type="text" placeholder="Breakfast buffet" error={errors.name?.message} {...register('name')} />
        <Input id="unit" label="Unit" type="text" placeholder="set, item, hour..." error={errors.unit?.message} {...register('unit')} />
        <Input id="price" label="Price" type="number" min="0.01" step="0.01" error={errors.price?.message} {...register('price', { valueAsNumber: true })} />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
