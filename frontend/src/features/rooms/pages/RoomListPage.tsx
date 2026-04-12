import { useDeferredValue, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui'
import { useAuth } from '../../auth/useAuth'
import type { CreateRoomRequest, Room, RoomStatus } from '../../../types'
import { ChangeStatusModal, RoomFormModal, RoomGridView, RoomStatusTabs, RoomTable } from '../components'
import { useCreateRoom, useDeleteRoom, useRooms, useUpdateRoom } from '../hooks/useRooms'
import { useRoomTypes } from '../../room-types/hooks/useRoomTypes'

type FilterType = 'booking' | 'type' | 'floor' | 'room'
type ViewMode = 'grid' | 'list'
type StatusFilter = 'all' | 'available' | 'reserved' | 'checkin' | 'occupied' | 'checkout' | 'dirty'

export default function RoomListPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [activeFilter] = useState<FilterType>('floor')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchValue, setSearchValue] = useState('')
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const deferredSearchValue = useDeferredValue(searchValue.trim())
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const roomStatusFilter = statusFilter === 'available' ? 'AVAILABLE' : statusFilter === 'occupied' ? 'OCCUPIED' : statusFilter === 'dirty' ? 'MAINTENANCE' : undefined
  const { data: rooms = [], isLoading, error: roomsError } = useRooms(
    {
      keyword: deferredSearchValue || undefined,
      status: roomStatusFilter,
    },
    { enabled: isAdmin },
  )
  const { data: allRooms = [], error: allRoomsError } = useRooms(undefined, { enabled: isAdmin })
  const { data: roomTypes = [], error: roomTypesError } = useRoomTypes(undefined, { enabled: isAdmin })
  const createRoom = useCreateRoom()
  const updateRoom = useUpdateRoom()
  const deleteRoom = useDeleteRoom()

  const statusCounts = useMemo(() => {
    const counts = { all: allRooms.length, available: 0, reserved: 0, checkin: 0, occupied: 0, checkout: 0, dirty: 0 }
    allRooms.forEach((room) => {
      if (room.status === 'AVAILABLE') counts.available++
      else if (room.status === 'OCCUPIED') counts.occupied++
      else if (room.status === 'MAINTENANCE') counts.dirty++
    })
    return counts
  }, [allRooms])

  const statusTabs = [
    { key: 'all', label: 'All', count: statusCounts.all, color: 'text-slate-600' },
    { key: 'available', label: 'Available', count: statusCounts.available, color: 'text-emerald-600' },
    { key: 'occupied', label: 'Occupied', count: statusCounts.occupied, color: 'text-rose-600' },
    { key: 'dirty', label: 'Maintenance', count: statusCounts.dirty, color: 'text-slate-400' },
  ]

  const pageErrorMessage =
    (allRoomsError instanceof Error && allRoomsError.message) ||
    (roomsError instanceof Error && roomsError.message) ||
    (roomTypesError instanceof Error && roomTypesError.message) ||
    (createRoom.error instanceof Error && createRoom.error.message) ||
    (updateRoom.error instanceof Error && updateRoom.error.message) ||
    (deleteRoom.error instanceof Error && deleteRoom.error.message) ||
    null

  const openCreateModal = () => {
    if (!isAdmin) {
      return
    }

    setSelectedRoom(null)
    setFormModalOpen(true)
  }

  const openEditModal = (room: Room) => {
    if (!isAdmin) {
      return
    }

    setSelectedRoom(room)
    setFormModalOpen(true)
  }

  const handleRoomClick = (room: Room) => {
    if (!isAdmin) {
      return
    }

    setSelectedRoom(room)
    setStatusModalOpen(true)
  }

  const handleRoomSubmit = (data: { roomNumber: string; roomTypeId: string; status: RoomStatus }) => {
    const payload: CreateRoomRequest = {
      roomNumber: data.roomNumber.trim(),
      roomTypeId: Number(data.roomTypeId),
      status: data.status,
    }

    if (selectedRoom) {
      updateRoom.mutate(
        { id: selectedRoom.id, data: payload },
        {
          onSuccess: () => {
            setFormModalOpen(false)
            setSelectedRoom(null)
            setFeedbackMessage(`Room ${payload.roomNumber} updated successfully.`)
          },
        },
      )
      return
    }

    createRoom.mutate(payload, {
      onSuccess: () => {
        setFormModalOpen(false)
        setFeedbackMessage(`Room ${payload.roomNumber} created successfully.`)
      },
    })
  }

  const handleStatusUpdate = (status: RoomStatus) => {
    if (!selectedRoom) {
      return
    }

    updateRoom.mutate(
      {
        id: selectedRoom.id,
        data: {
          roomNumber: selectedRoom.roomNumber,
          roomTypeId: selectedRoom.type.id,
          status,
        },
      },
      {
        onSuccess: () => {
          setStatusModalOpen(false)
          setSelectedRoom(null)
          setFeedbackMessage(`Room ${selectedRoom.roomNumber} status updated.`)
        },
      },
    )
  }

  const handleDeleteRoom = (room: Room) => {
    if (!isAdmin) {
      return
    }

    if (confirm(`Delete room ${room.roomNumber}? This only works when the room has no booking or stay history.`)) {
      deleteRoom.mutate(room.id, {
        onSuccess: () => {
          setFeedbackMessage(`Room ${room.roomNumber} deleted successfully.`)
        },
      })
    }
  }

  const isRoomMutationPending = createRoom.isPending || updateRoom.isPending || deleteRoom.isPending

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have access to room management. Only ADMIN accounts can view and update this data.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Room Operations</h1>
          <p className="mt-1 font-medium text-slate-500">Monitor inventory and manage room status in real time.</p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              viewMode === 'grid' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              viewMode === 'list' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">view_list</span>
          </button>
        </div>
      </div>

      {pageErrorMessage && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {pageErrorMessage}
        </div>
      )}

      {feedbackMessage && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {feedbackMessage}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col items-stretch gap-4 xl:flex-row xl:items-center">
          <div className="flex-1 overflow-x-auto rounded-[2rem] border border-slate-100 bg-white p-2 shadow-sm no-scrollbar">
            <RoomStatusTabs tabs={statusTabs} activeTab={statusFilter} onTabChange={(key) => setStatusFilter(key as StatusFilter)} />
          </div>

          <div className="group flex items-center rounded-2xl border border-slate-100 bg-white px-4 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary-100 xl:w-80">
            <span className="material-symbols-outlined text-slate-400 transition-colors group-focus-within:text-primary-600">search</span>
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full border-none bg-transparent px-3 py-3 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>

          <Button onClick={openCreateModal} className="rounded-2xl bg-slate-900 px-6 py-6 shadow-xl shadow-slate-200">
            <span className="material-symbols-outlined mr-2">add</span>
            Add Room
          </Button>
          <Button variant="secondary" onClick={() => navigate('/room-types')} className="rounded-2xl px-6 py-6">
            Manage Types
          </Button>
        </div>

        <div className="min-h-[400px]">
          {viewMode === 'grid' ? (
            <RoomGridView
              rooms={rooms}
              loading={isLoading}
              groupBy={activeFilter === 'floor' ? 'floor' : 'type'}
              onRoomClick={handleRoomClick}
            />
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
              <RoomTable rooms={rooms} loading={isLoading} onEdit={openEditModal} onChangeStatus={handleRoomClick} onDelete={handleDeleteRoom} />
            </div>
          )}
        </div>
      </div>

      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setFormModalOpen(false)
          setSelectedRoom(null)
        }}
        onSubmit={handleRoomSubmit}
        room={selectedRoom ?? undefined}
        roomTypes={roomTypes}
        loading={isRoomMutationPending}
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
