import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { changePassword } from '../../api/authApi'
import { Button, Card, CardContent, CardHeader, Input } from '../../components/ui'

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm the new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Password confirmation does not match',
    path: ['confirmPassword'],
  })

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export default function ChangePasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null)
    setSuccessMessage(null)

    try {
      await changePassword(values)
      setSuccessMessage('Password updated successfully.')
      reset()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Password could not be changed right now.')
    }
  })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div>
        <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Change Password</h1>
        <p className="mt-1 font-medium text-slate-500">Update the current account password without leaving the back-office workflow.</p>
      </div>

      {submitError && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{submitError}</div>}
      {successMessage && <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{successMessage}</div>}

      <Card className="max-w-2xl border-none shadow-2xl shadow-slate-200/50">
        <CardHeader title="Password Details" subtitle="Enter the current password and the new password." icon="lock_reset" />
        <CardContent>
          <form className="space-y-5" onSubmit={onSubmit} noValidate>
            <Input id="currentPassword" label="Current Password" type="password" error={errors.currentPassword?.message} {...register('currentPassword')} />
            <Input id="newPassword" label="New Password" type="password" error={errors.newPassword?.message} {...register('newPassword')} />
            <Input id="confirmPassword" label="Confirm New Password" type="password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />

            <div className="flex justify-end">
              <Button type="submit" className="rounded-xl px-6 py-3" loading={isSubmitting}>
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
