import { Button } from '../../../components/ui'
import type { RoomStatus } from '../../../types'

interface RoomFiltersProps {
  currentStatus: RoomStatus | undefined
  onStatusChange: (status: RoomStatus | undefined) => void
}

const statuses: { value: RoomStatus | undefined; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'OCCUPIED', label: 'Occupied' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
]

export function RoomFilters({ currentStatus, onStatusChange }: RoomFiltersProps) {
  return (
    <div className="flex gap-2">
      {statuses.map((status) => (
        <Button
          key={status.label}
          variant={currentStatus === status.value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onStatusChange(status.value)}
        >
          {status.label}
        </Button>
      ))}
    </div>
  )
}
