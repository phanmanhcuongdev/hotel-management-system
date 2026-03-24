interface StatsCardProps {
  title: string
  value: string | number
  icon: string // Changed to icon name for Material Symbols
  color: 'blue' | 'green' | 'yellow' | 'red'
  trend?: {
    value: number
    isPositive: boolean
  }
}

const colorConfigs = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-600 shadow-blue-200',
    text: 'text-blue-600',
    gradient: 'from-blue-600 to-blue-400'
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-600 shadow-emerald-200',
    text: 'text-emerald-600',
    gradient: 'from-emerald-600 to-emerald-400'
  },
  yellow: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-600 shadow-amber-200',
    text: 'text-amber-600',
    gradient: 'from-amber-600 to-amber-400'
  },
  red: {
    bg: 'bg-rose-50',
    icon: 'bg-rose-600 shadow-rose-200',
    text: 'text-rose-600',
    gradient: 'from-rose-600 to-rose-400'
  },
}

export function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const config = colorConfigs[color]
  
  return (
    <div className="group relative overflow-hidden bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Decorative Gradient Background */}
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-150 ${config.bg}`} />
      
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${config.gradient} ${config.icon}`}>
            <span className="material-symbols-outlined text-[28px]">{icon}</span>
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              <span className="material-symbols-outlined text-[14px]">
                {trend.isPositive ? 'trending_up' : 'trending_down'}
              </span>
              {trend.value}%
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-500 tracking-tight">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-900">{value}</h3>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">đơn vị</span>
          </div>
        </div>
      </div>
    </div>
  )
}
