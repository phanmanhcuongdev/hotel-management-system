import { useState } from 'react'
import { Card, CardHeader, CardContent, Button } from '../../../components/ui'
import { RoomTable, RoomFilters, RoomFormModal, ChangeStatusModal } from '../components'
import { useRooms, useUpdateRoom } from '../hooks/useRooms'
import type { Room, RoomStatus } from '../../../types'

export default function RoomListPage() {
  const [statusFilter, setStatusFilter] = useState<RoomStatus | undefined>()
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const { data: rooms = [], isLoading } = useRooms(statusFilter)
  const updateRoom = useUpdateRoom()

  const handleEdit = (room: Room) => {
    setSelectedRoom(room)
    setFormModalOpen(true)
  }

  const handleChangeStatus = (room: Room) => {
    setSelectedRoom(room)
    setStatusModalOpen(true)
  }

  const handleStatusUpdate = (status: RoomStatus) => {
    if (selectedRoom) {
      updateRoom.mutate(
        { id: selectedRoom.id, data: { status } },
        {
          onSuccess: () => {
            setStatusModalOpen(false)
            setSelectedRoom(null)
          },
        }
      )
    }
  }

  const handleFormClose = () => {
    setFormModalOpen(false)
    setSelectedRoom(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
        <Button onClick={() => setFormModalOpen(true)}>Add Room</Button>
      </div>

      <Card>
        <CardHeader
          title="All Rooms"
          action={
            <RoomFilters
              currentStatus={statusFilter}
              onStatusChange={setStatusFilter}
            />
          }
        />
        <CardContent className="p-0">
          <RoomTable
            rooms={rooms}
            loading={isLoading}
            onEdit={handleEdit}
            onChangeStatus={handleChangeStatus}
          />
        </CardContent>
      </Card>

      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={handleFormClose}
        onSubmit={(data) => {
          console.log('Form submitted:', data)
          handleFormClose()
        }}
        room={selectedRoom || undefined}
      />

      <ChangeStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setStatusModalOpen(false)
          setSelectedRoom(null)
        }}
        onSubmit={handleStatusUpdate}
        room={selectedRoom}
        loading={updateRoom.isPending}
      />
    </div>
  )
}
