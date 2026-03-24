interface StatusTab {
  key: string
  label: string
  count: number
  color: string
}

interface RoomStatusTabsProps {
  tabs: StatusTab[]
  activeTab: string
  onTabChange: (key: string) => void
}

export function RoomStatusTabs({ tabs, activeTab, onTabChange }: RoomStatusTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
              isActive
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="relative z-10">{tab.label}</span>
            <span className={`relative z-10 flex h-6 min-w-[1.5rem] items-center justify-center rounded-lg px-1.5 text-[10px] font-black tabular-nums transition-colors ${
              isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
