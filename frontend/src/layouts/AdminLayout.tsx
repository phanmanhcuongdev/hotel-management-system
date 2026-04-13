import { useMemo, useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'
import { NotificationBell } from '../features/notifications/NotificationBell'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Rooms', href: '/rooms', icon: 'bed' },
  { name: 'Room Types', href: '/room-types', icon: 'hotel_class' },
  { name: 'Bookings', href: '/bookings', icon: 'book_online' },
  { name: 'Services', href: '/services', icon: 'room_service' },
  { name: 'Clients', href: '/clients', icon: 'badge' },
  { name: 'Property', href: '/property', icon: 'apartment' },
  { name: 'Billing', href: '/billing', icon: 'receipt_long' },
  { name: 'Reports', href: '/reports', icon: 'monitoring' },
  { name: 'Users', href: '/users', icon: 'group' },
  { name: 'Change Password', href: '/change-password', icon: 'lock_reset' },
]

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const currentPage = useMemo(() => {
    const activeItem = navigation.find((item) => pathname.startsWith(item.href))
    return activeItem?.name ?? 'Dashboard'
  }, [pathname])

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-white transition-all duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-500/20">
            <span className="material-symbols-outlined text-[24px]">apartment</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Grand Hotel <span className="text-primary-400">Hub</span>
          </span>
        </div>

        <div className="mt-4 flex-1 px-4 py-4">
          <p className="mb-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Admin Menu</p>
          <nav className="space-y-1.5">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[22px] transition-colors">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-700 font-bold text-primary-400">
                {user.initials}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-500">{user.role}</p>
              </div>
            </div>
            <button
              onClick={() => {
                void logout()
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700/50 py-2.5 text-xs font-bold text-slate-300 transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{currentPage}</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>Home</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary-600">{currentPage}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-1">
              <NotificationBell />
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="flex items-center justify-end gap-1 text-[11px] font-medium text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Online
                </p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=2563eb&bold=true`}
                className="h-10 w-10 rounded-xl border-2 border-white shadow-sm"
                alt="Avatar"
              />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
