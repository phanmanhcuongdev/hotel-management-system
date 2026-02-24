import { Badge } from '../../../components/ui'
import type { RoomStatus } from '../../../types'

interface RoomStatusBadgeProps {
  status: RoomStatus
}

const statusConfig: Record<RoomStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  AVAILABLE: { label: 'Available', variant: 'success' },
  OCCUPIED: { label: 'Occupied', variant: 'danger' },
  MAINTENANCE: { label: 'Maintenance', variant: 'warning' },
}

export function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
