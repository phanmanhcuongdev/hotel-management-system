import type { NotificationTone } from './notificationStore'
import { hideNotificationToast, markNotificationRead, useNotificationsState } from './notificationStore'

const toneStyles: Record<NotificationTone, { container: string; icon: string }> = {
  success: {
    container: 'border-emerald-100 bg-emerald-50 text-emerald-900',
    icon: 'check_circle',
  },
  error: {
    container: 'border-red-100 bg-red-50 text-red-900',
    icon: 'error',
  },
  info: {
    container: 'border-sky-100 bg-sky-50 text-sky-900',
    icon: 'info',
  },
  warning: {
    container: 'border-amber-100 bg-amber-50 text-amber-900',
    icon: 'warning',
  },
}

export function NotificationToastViewport() {
  const { items } = useNotificationsState()
  const visibleToasts = items.filter((item) => item.toastVisible).slice(0, 4)

  if (!visibleToasts.length) {
    return null
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-[min(92vw,24rem)] flex-col gap-3">
      {visibleToasts.map((item) => {
        const style = toneStyles[item.tone]

        return (
          <article
            key={item.id}
            className={`pointer-events-auto animate-in fade-in slide-in-from-top-1 rounded-2xl border px-4 py-3 shadow-xl shadow-slate-200/70 ${style.container}`}
            onMouseEnter={() => markNotificationRead(item.id)}
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-[18px]">{style.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-5">{item.title}</p>
                {item.message && <p className="mt-0.5 whitespace-pre-line text-sm leading-5 opacity-90">{item.message}</p>}
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-black/5 hover:text-slate-700"
                onClick={() => {
                  hideNotificationToast(item.id)
                  markNotificationRead(item.id)
                }}
                aria-label="Dismiss notification"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
