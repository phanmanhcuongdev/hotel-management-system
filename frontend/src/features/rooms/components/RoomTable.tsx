import { Table, Button } from '../../../components/ui'
import { RoomStatusBadge } from './RoomStatusBadge'
import type { Room } from '../../../types'

interface RoomTableProps {
  rooms: Room[]
  loading?: boolean
  onEdit: (room: Room) => void
  onChangeStatus: (room: Room) => void
}

export function RoomTable({ rooms, loading, onEdit, onChangeStatus }: RoomTableProps) {
  const getRoomTypeName = (room: Room) => room.type?.name ?? 'Unknown type'
  const getRoomCapacity = (room: Room) => room.type?.capacity ?? 0
  const getRoomPrice = (room: Room) => room.type?.price ?? 0

  const columns = [
    {
      key: 'roomNumber',
      header: 'Room Number',
      render: (room: Room) => (
        <span className="font-medium">{room.roomNumber}</span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (room: Room) => getRoomTypeName(room),
    },
    {
      key: 'capacity',
      header: 'Capacity',
      render: (room: Room) => `${getRoomCapacity(room)} guests`,
    },
    {
      key: 'price',
      header: 'Price/Night',
      render: (room: Room) => `$${getRoomPrice(room).toLocaleString()}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (room: Room) => <RoomStatusBadge status={room.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (room: Room) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(room)}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onChangeStatus(room)}>
            Change Status
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={rooms}
      keyExtractor={(room) => room.id}
      loading={loading}
      emptyMessage="No rooms found"
    />
  )
}
