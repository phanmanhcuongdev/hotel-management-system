import { Button } from '../../../components/ui'

type FilterType = 'booking' | 'type' | 'floor' | 'room'
type ViewMode = 'grid' | 'list'

interface RoomFilterBarProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  searchValue: string
  onSearchChange: (value: string) => void
}

export function RoomFilterBar({
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  searchValue,
  onSearchChange,
}: RoomFilterBarProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'booking', label: 'Booking' },
    { key: 'type', label: 'Type' },
    { key: 'floor', label: 'Floor' },
    { key: 'room', label: 'Room' },
  ]

  return (
    <div className="flex items-center justify-between py-3 border-b">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              activeFilter === filter.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Right side - Search and view toggle */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm">
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </Button>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search room..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
