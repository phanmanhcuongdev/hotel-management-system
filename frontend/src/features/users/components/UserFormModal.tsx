import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Input, Modal } from '../../../components/ui'
import type { CreateUserRequest, UpdateUserRequest, User } from '../../../types'

const createUserSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().trim().min(1, 'Full name is required'),
  position: z.literal('ADMIN', { message: 'Only the ADMIN role is currently supported' }),
  mail: z.string().trim().email('Email must be valid').optional().or(z.literal('')),
  description: z.string().trim().max(255, 'Description must be at most 255 characters').optional().or(z.literal('')),
})

const updateUserSchema = createUserSchema.omit({ password: true })

type CreateUserFormValues = z.infer<typeof createUserSchema>
type UpdateUserFormValues = z.infer<typeof updateUserSchema>

interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: CreateUserRequest) => void
  onUpdate: (data: UpdateUserRequest) => void
  loading: boolean
  user?: User | null
}

export function UserFormModal({ isOpen, onClose, onCreate, onUpdate, loading, user }: UserFormModalProps) {
  const isEditMode = !!user
  const schema = isEditMode ? updateUserSchema : createUserSchema

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues | UpdateUserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      position: 'ADMIN',
      mail: '',
      description: '',
    },
  })

  useEffect(() => {
    if (!isOpen) {
      return
    }

    reset({
      username: user?.username ?? '',
      password: '',
      fullName: user?.fullName ?? '',
      position: 'ADMIN',
      mail: user?.mail ?? '',
      description: user?.description ?? '',
    })
  }, [isOpen, reset, user])

  const onSubmit = handleSubmit((values) => {
    const payload = {
      username: values.username.trim(),
      fullName: values.fullName.trim(),
      position: values.position,
      mail: values.mail?.trim() || undefined,
      description: values.description?.trim() || undefined,
    }

    if (isEditMode) {
      onUpdate(payload)
      return
    }

    onCreate({
      ...payload,
      password: (values as CreateUserFormValues).password,
    })
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Update User' : 'Create User'} size="md">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <Input id="username" label="Username" error={errors.username?.message} {...register('username')} />
        {!isEditMode && (
          <Input
            id="password"
            label="Password"
            type="password"
            error={'password' in errors ? errors.password?.message : undefined}
            {...register('password' as const)}
          />
        )}
        <Input id="fullName" label="Full Name" error={errors.fullName?.message} {...register('fullName')} />

        <div className="space-y-1">
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="position"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('position')}
          >
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.position?.message && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
        </div>

        <Input id="mail" label="Email" error={errors.mail?.message} {...register('mail')} />

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
            {isEditMode ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
