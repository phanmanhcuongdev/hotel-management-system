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
    <div className="flex items-center gap-4 text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex items-center gap-1 py-2 border-b-2 transition-colors ${
            activeTab === tab.key
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className={tab.color}>{tab.label}</span>
          <span className="text-gray-400">({tab.count})</span>
        </button>
      ))}
    </div>
  )
}
