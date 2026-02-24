import { useState, useMemo } from 'react'
import { RoomStatusTabs, RoomFilterBar, RoomGridView, RoomTable, RoomFormModal, ChangeStatusModal } from '../components'
import { useRooms, useUpdateRoom } from '../hooks/useRooms'
import { mockBookings } from '../../../data/mockData'
import type { Room, RoomStatus } from '../../../types'

type FilterType = 'booking' | 'type' | 'floor' | 'room'
type ViewMode = 'grid' | 'list'
type StatusFilter = 'all' | 'available' | 'reserved' | 'checkin' | 'occupied' | 'checkout' | 'dirty'

export default function RoomListPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [activeFilter, setActiveFilter] = useState<FilterType>('floor')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchValue, setSearchValue] = useState('')
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const { data: rooms = [], isLoading } = useRooms()
  const updateRoom = useUpdateRoom()

  // Calculate status counts
  const statusCounts = useMemo(() => {
    const counts = {
      all: rooms.length,
      available: 0,
      reserved: 0,
      checkin: 0,
      occupied: 0,
      checkout: 0,
      dirty: 0,
    }
    rooms.forEach((room) => {
      if (room.status === 'AVAILABLE') counts.available++
      else if (room.status === 'OCCUPIED') counts.occupied++
      else if (room.status === 'MAINTENANCE') counts.dirty++
    })
    return counts
  }, [rooms])

  const statusTabs = [
    { key: 'available', label: 'Available', count: statusCounts.available, color: 'text-green-600' },
    { key: 'reserved', label: 'Reserved', count: statusCounts.reserved, color: 'text-blue-600' },
    { key: 'checkin', label: 'Arriving', count: statusCounts.checkin, color: 'text-purple-600' },
    { key: 'occupied', label: 'Occupied', count: statusCounts.occupied, color: 'text-orange-600' },
    { key: 'checkout', label: 'Departing', count: statusCounts.checkout, color: 'text-yellow-600' },
    { key: 'dirty', label: 'Dirty', count: statusCounts.dirty, color: 'text-red-600' },
  ]

  // Filter rooms
  const filteredRooms = useMemo(() => {
    let result = rooms

    // Filter by status
    if (statusFilter === 'available') {
      result = result.filter((r) => r.status === 'AVAILABLE')
    } else if (statusFilter === 'occupied') {
      result = result.filter((r) => r.status === 'OCCUPIED')
    } else if (statusFilter === 'dirty') {
      result = result.filter((r) => r.status === 'MAINTENANCE')
    }

    // Filter by search
    if (searchValue) {
      result = result.filter((r) =>
        r.roomNumber.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    return result
  }, [rooms, statusFilter, searchValue])

  // Add mock booking data to rooms
  const roomsWithBookings = useMemo(() => {
    return filteredRooms.map((room) => ({
      ...room,
      currentBooking: room.status === 'OCCUPIED' ? mockBookings[room.id] : undefined,
    }))
  }, [filteredRooms])

  const handleRoomClick = (room: Room) => {
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

  const groupBy = activeFilter === 'floor' ? 'floor' : activeFilter === 'type' ? 'type' : 'none'

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
      </div>

      {/* Status tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 pt-4">
          <RoomStatusTabs
            tabs={statusTabs}
            activeTab={statusFilter}
            onTabChange={(key) => setStatusFilter(key as StatusFilter)}
          />
        </div>

        {/* Filter bar */}
        <div className="px-4">
          <RoomFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </div>

        {/* Room content */}
        <div className="p-4">
          {viewMode === 'grid' ? (
            <RoomGridView
              rooms={roomsWithBookings}
              loading={isLoading}
              groupBy={groupBy}
              onRoomClick={handleRoomClick}
            />
          ) : (
            <RoomTable
              rooms={filteredRooms}
              loading={isLoading}
              onEdit={(room) => {
                setSelectedRoom(room)
                setFormModalOpen(true)
              }}
              onChangeStatus={handleRoomClick}
            />
          )}
        </div>
      </div>

      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setFormModalOpen(false)
          setSelectedRoom(null)
        }}
        onSubmit={(data) => {
          console.log('Form submitted:', data)
          setFormModalOpen(false)
          setSelectedRoom(null)
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
