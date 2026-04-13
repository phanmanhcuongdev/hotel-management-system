import { useEffect, useMemo, useRef, useState } from 'react'
import type { NotificationTone } from './notificationStore'
import { markAllNotificationsRead, useNotificationsState } from './notificationStore'

const tonePillStyles: Record<NotificationTone, string> = {
  success: 'bg-emerald-100 text-emerald-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-sky-100 text-sky-800',
  warning: 'bg-amber-100 text-amber-800',
}

function formatRelativeTime(timestamp: number) {
  const elapsedMs = Date.now() - timestamp
  const elapsedMinutes = Math.floor(elapsedMs / 60000)

  if (elapsedMinutes < 1) {
    return 'Just now'
  }

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes}m ago`
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60)
  if (elapsedHours < 24) {
    return `${elapsedHours}h ago`
  }

  const elapsedDays = Math.floor(elapsedHours / 24)
  return `${elapsedDays}d ago`
}

export function NotificationBell() {
  const { items } = useNotificationsState()
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const unreadCount = useMemo(() => items.reduce((total, item) => total + (item.read ? 0 : 1), 0), [items])
  const latestItems = useMemo(() => items.slice(0, 8), [items])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    markAllNotificationsRead()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
        onClick={() => setOpen((previous) => !previous)}
        aria-label="Open notifications"
      >
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-40 w-[min(90vw,24rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-900">Notifications</p>
            <span className="text-xs font-semibold text-slate-500">{items.length} total</span>
          </div>

          {!latestItems.length ? (
            <div className="px-4 py-8 text-center text-sm text-slate-500">No notifications yet.</div>
          ) : (
            <ul className="max-h-[24rem] overflow-y-auto">
              {latestItems.map((item) => (
                <li key={item.id} className="border-b border-slate-100 px-4 py-3 last:border-b-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-slate-900">{item.title}</p>
                      {item.message && <p className="mt-0.5 whitespace-pre-line text-sm leading-5 text-slate-600">{item.message}</p>}
                      <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">{formatRelativeTime(item.createdAt)}</p>
                    </div>
                    <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${tonePillStyles[item.tone]}`}>
                      {item.tone}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
