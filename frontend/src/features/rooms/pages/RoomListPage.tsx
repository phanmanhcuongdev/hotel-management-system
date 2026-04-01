import { useState, useMemo } from 'react'
import { RoomStatusTabs, RoomGridView, RoomTable, RoomFormModal, ChangeStatusModal } from '../components'
import { useRooms, useUpdateRoom } from '../hooks/useRooms'
import { Button } from '../../../components/ui'
import type { Room, RoomStatus } from '../../../types'

type FilterType = 'booking' | 'type' | 'floor' | 'room'
type ViewMode = 'grid' | 'list'
type StatusFilter = 'all' | 'available' | 'reserved' | 'checkin' | 'occupied' | 'checkout' | 'dirty'

export default function RoomListPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [activeFilter] = useState<FilterType>('floor')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchValue, setSearchValue] = useState('')
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const { data: rooms = [], isLoading } = useRooms()
  const updateRoom = useUpdateRoom()

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
    if (statusFilter === 'available') result = result.filter((r) => r.status === 'AVAILABLE')
    else if (statusFilter === 'occupied') result = result.filter((r) => r.status === 'OCCUPIED')
    else if (statusFilter === 'dirty') result = result.filter((r) => r.status === 'MAINTENANCE')
    if (searchValue) result = result.filter((r) => r.roomNumber.toLowerCase().includes(searchValue.toLowerCase()))
    return result
  }, [rooms, statusFilter, searchValue])

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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black italic text-slate-900 tracking-tight uppercase">Sơ đồ phòng nghỉ</h1>
          <p className="mt-1 text-slate-500 font-medium">Theo dõi và vận hành trạng thái phòng thời gian thực.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">view_list</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-center">
          <div className="flex-1 bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
            <RoomStatusTabs
              tabs={statusTabs}
              activeTab={statusFilter}
              onTabChange={(key) => setStatusFilter(key as StatusFilter)}
            />
          </div>

          <div className="xl:w-80 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex items-center px-4 group focus-within:ring-2 focus-within:ring-primary-100 transition-all">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary-600 transition-colors">search</span>
            <input
              type="text"
              placeholder="Tìm số phòng..."
              className="w-full bg-transparent border-none outline-none px-3 py-2 text-sm font-bold text-slate-900 placeholder:text-slate-300"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setFormModalOpen(true)}
            className="rounded-2xl bg-slate-900 py-6 px-6 shadow-xl shadow-slate-200"
          >
            <span className="material-symbols-outlined mr-2">add</span>
            Thêm Phòng
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
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <RoomTable
                rooms={filteredRooms}
                loading={isLoading}
                onEdit={(room) => { setSelectedRoom(room); setFormModalOpen(true); }}
                onChangeStatus={handleRoomClick}
              />
            </div>
          )}
        </div>
      </div>

      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={() => { setFormModalOpen(false); setSelectedRoom(null); }}
        onSubmit={(data) => { setFormModalOpen(false); setSelectedRoom(null); }}
        room={selectedRoom || undefined}
      />

      <ChangeStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => { setStatusModalOpen(false); setSelectedRoom(null); }}
        onSubmit={handleStatusUpdate}
        room={selectedRoom}
        loading={updateRoom.isPending}
      />
    </div>
  )
}
