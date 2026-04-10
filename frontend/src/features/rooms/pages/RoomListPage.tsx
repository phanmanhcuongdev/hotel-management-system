import { useMemo, useState } from 'react'
import { Button } from '../../../components/ui'
import { useAuth } from '../../auth/useAuth'
import type { CreateRoomRequest, Room, RoomStatus, RoomType } from '../../../types'
import { ChangeStatusModal, RoomFormModal, RoomGridView, RoomStatusTabs, RoomTable } from '../components'
import { useCreateRoom, useRooms, useUpdateRoom } from '../hooks/useRooms'

type FilterType = 'booking' | 'type' | 'floor' | 'room'
type ViewMode = 'grid' | 'list'
type StatusFilter = 'all' | 'available' | 'reserved' | 'checkin' | 'occupied' | 'checkout' | 'dirty'

export default function RoomListPage() {
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [activeFilter] = useState<FilterType>('floor')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchValue, setSearchValue] = useState('')
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const { data: rooms = [], isLoading, error: roomsError } = useRooms(undefined, { enabled: isAdmin })
  const createRoom = useCreateRoom()
  const updateRoom = useUpdateRoom()

  const roomTypes = useMemo<RoomType[]>(() => {
    const byId = new Map<number, RoomType>()

    rooms.forEach((room) => {
      if (!byId.has(room.type.id)) {
        byId.set(room.type.id, room.type)
      }
    })

    if (selectedRoom && !byId.has(selectedRoom.type.id)) {
      byId.set(selectedRoom.type.id, selectedRoom.type)
    }

    return Array.from(byId.values())
  }, [rooms, selectedRoom])

  const statusCounts = useMemo(() => {
    const counts = { all: rooms.length, available: 0, reserved: 0, checkin: 0, occupied: 0, checkout: 0, dirty: 0 }
    rooms.forEach((room) => {
      if (room.status === 'AVAILABLE') counts.available++
      else if (room.status === 'OCCUPIED') counts.occupied++
      else if (room.status === 'MAINTENANCE') counts.dirty++
    })
    return counts
  }, [rooms])

  const statusTabs = [
    { key: 'all', label: 'Tất cả', count: statusCounts.all, color: 'text-slate-600' },
    { key: 'available', label: 'Sẵn sàng', count: statusCounts.available, color: 'text-emerald-600' },
    { key: 'occupied', label: 'Đang ở', count: statusCounts.occupied, color: 'text-rose-600' },
    { key: 'dirty', label: 'Bảo trì', count: statusCounts.dirty, color: 'text-slate-400' },
  ]

  const filteredRooms = useMemo(() => {
    let result = rooms

    if (statusFilter === 'available') result = result.filter((room) => room.status === 'AVAILABLE')
    else if (statusFilter === 'occupied') result = result.filter((room) => room.status === 'OCCUPIED')
    else if (statusFilter === 'dirty') result = result.filter((room) => room.status === 'MAINTENANCE')

    if (searchValue) {
      result = result.filter((room) => room.roomNumber.toLowerCase().includes(searchValue.toLowerCase()))
    }

    return result
  }, [rooms, searchValue, statusFilter])

  const pageErrorMessage =
    (roomsError instanceof Error && roomsError.message) ||
    (createRoom.error instanceof Error && createRoom.error.message) ||
    (updateRoom.error instanceof Error && updateRoom.error.message) ||
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
          },
        }
      )
      return
    }

    createRoom.mutate(payload, {
      onSuccess: () => {
        setFormModalOpen(false)
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
        },
      }
    )
  }

  const isRoomMutationPending = createRoom.isPending || updateRoom.isPending

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        Ban khong co quyen truy cap khu vuc quan ly phong. Backend hien chi cho phep tai khoan ADMIN xem va cap nhat du lieu nay.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Sơ đồ phòng nghỉ</h1>
          <p className="mt-1 font-medium text-slate-500">Theo dõi và vận hành trạng thái phòng theo thời gian thực.</p>
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

      <div className="space-y-6">
        <div className="flex flex-col items-stretch gap-4 xl:flex-row xl:items-center">
          <div className="flex-1 overflow-x-auto rounded-[2rem] border border-slate-100 bg-white p-2 shadow-sm no-scrollbar">
            <RoomStatusTabs tabs={statusTabs} activeTab={statusFilter} onTabChange={(key) => setStatusFilter(key as StatusFilter)} />
          </div>

          <div className="group flex items-center rounded-2xl border border-slate-100 bg-white px-4 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary-100 xl:w-80">
            <span className="material-symbols-outlined text-slate-400 transition-colors group-focus-within:text-primary-600">search</span>
            <input
              type="text"
              placeholder="Tìm số phòng..."
              className="w-full border-none bg-transparent px-3 py-3 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>

          <Button onClick={openCreateModal} className="rounded-2xl bg-slate-900 px-6 py-6 shadow-xl shadow-slate-200">
            <span className="material-symbols-outlined mr-2">add</span>
            Thêm phòng
          </Button>
        </div>

        <div className="min-h-[400px]">
          {viewMode === 'grid' ? (
            <RoomGridView
              rooms={filteredRooms}
              loading={isLoading}
              groupBy={activeFilter === 'floor' ? 'floor' : 'type'}
              onRoomClick={handleRoomClick}
            />
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
              <RoomTable rooms={filteredRooms} loading={isLoading} onEdit={openEditModal} onChangeStatus={handleRoomClick} />
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
