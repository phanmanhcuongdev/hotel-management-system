import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../../components/ui'
import { MOCK_AUTH_ENABLED } from './authService'
import { useAuth } from './useAuth'

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Vui lòng nhập email hoặc username'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  remember: z.boolean().default(true),
})

type LoginFormValues = z.infer<typeof loginSchema>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 animate-in fade-in slide-in-from-top-1 text-xs font-medium text-red-500">{message}</p>
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const redirectTo = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null
    return state?.from?.pathname ?? '/dashboard'
  }, [location.state])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'admin',
      password: 'admin123',
      remember: true,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null)
    try {
      await login(values)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng nhập thất bại. Vui lòng thử lại.'
      setSubmitError(message)
    }
  })

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      <div className="relative hidden w-1/2 flex-col overflow-hidden bg-slate-900 lg:flex">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070"
          alt="Luxury Hotel"
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[10000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

        <div className="relative z-10 flex flex-1 flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30">
              <span className="material-symbols-outlined text-[24px]">apartment</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Grand Hotel <span className="text-primary-400">Hub</span>
            </span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white">
              Vận hành <span className="text-primary-400">thông minh</span>, dịch vụ <span className="text-primary-400">đẳng cấp</span>.
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Hệ thống quản lý khách sạn hiện đại giúp tối ưu quy trình đặt phòng, quản lý buồng phòng và nâng tầm trải nghiệm khách hàng.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((index) => (
                <img
                  key={index}
                  className="h-10 w-10 rounded-full border-2 border-slate-900 object-cover shadow-sm"
                  src={`https://i.pravatar.cc/150?u=${index + 10}`}
                  alt="Staff member"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-300">
              Hơn <span className="font-bold text-white">500+</span> nhân viên đã tin dùng hệ thống.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 lg:p-12 xl:p-24">
        <div className="w-full max-w-sm">
          <div className="mb-12 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30">
              <span className="material-symbols-outlined text-[24px]">apartment</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Grand Hotel <span className="text-primary-600">Hub</span>
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Chào mừng trở lại</h2>
            <p className="mt-3 text-slate-500">Vui lòng nhập thông tin để truy cập vào hệ thống quản trị.</p>
          </div>

          {submitError && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              <span className="material-symbols-outlined mt-0.5 text-[18px]">error</span>
              <span>{submitError}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-slate-700">
                Email hoặc tên đăng nhập
              </label>
              <div className="group relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary-600">
                  person
                </span>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-100"
                  placeholder="admin hoặc admin@hotel.com"
                  {...register('username')}
                />
              </div>
              <FieldError message={errors.username?.message} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Mật khẩu
                </label>
                <button type="button" className="text-xs font-semibold text-primary-600 transition-colors hover:text-primary-700">
                  Quên mật khẩu?
                </button>
              </div>
              <div className="group relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary-600">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-12 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-100"
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              <FieldError message={errors.password?.message} />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary-600 transition-colors focus:ring-primary-600"
                {...register('remember')}
              />
              <label htmlFor="remember" className="ml-3 cursor-pointer select-none text-sm font-medium text-slate-600">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-primary-600 py-6 text-base font-bold text-white shadow-xl shadow-primary-200 transition-all hover:bg-primary-700 hover:shadow-primary-300 active:scale-[0.98]"
              loading={isSubmitting}
            >
              Đăng nhập ngay
            </Button>

            {MOCK_AUTH_ENABLED && (
              <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  Demo Account
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="flex justify-between text-slate-600">
                    <span>Tài khoản:</span>
                    <span className="font-mono font-semibold text-slate-900">admin</span>
                  </p>
                  <p className="flex justify-between text-slate-600">
                    <span>Mật khẩu:</span>
                    <span className="font-mono font-semibold text-slate-900">admin123</span>
                  </p>
                </div>
              </div>
            )}
          </form>

          <p className="mt-12 text-center text-sm text-slate-500">© 2024 Grand Hotel Hub. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
