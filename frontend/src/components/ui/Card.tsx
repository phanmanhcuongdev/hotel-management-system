import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  icon?: string
}

export function CardHeader({ title, subtitle, action, icon }: CardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-7 border-b border-slate-50">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-primary-600">
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm font-medium text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {action}
      </div>
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export function CardContent({ children, className = '', noPadding = false }: CardContentProps) {
  return <div className={`${noPadding ? '' : 'px-8 py-7'} ${className}`}>{children}</div>
}
