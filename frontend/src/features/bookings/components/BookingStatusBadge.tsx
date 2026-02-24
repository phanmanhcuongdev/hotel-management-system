import { Badge } from '../../../components/ui'
import type { BookingStatus } from '../../../types'

interface BookingStatusBadgeProps {
  status: BookingStatus
}

const statusConfig: Record<BookingStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  PENDING: { label: 'Pending', variant: 'warning' },
  CONFIRMED: { label: 'Confirmed', variant: 'info' },
  CANCELLED: { label: 'Cancelled', variant: 'danger' },
  COMPLETED: { label: 'Completed', variant: 'success' },
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
