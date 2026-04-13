import { useDeferredValue, useMemo, useState } from 'react'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import { useAuth } from '../../auth/useAuth'
import { RoomTypeFormModal } from '../components/RoomTypeFormModal'
import { useCreateRoomType, useDeleteRoomType, useRoomTypes, useUpdateRoomType } from '../hooks/useRoomTypes'
import type { RoomType } from '../../../types'
import type { CreateRoomTypeRequest, UpdateRoomTypeRequest } from '../../../api/roomTypes'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function RoomTypeListPage() {
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'
  const [searchValue, setSearchValue] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null)
  const deferredSearchValue = useDeferredValue(searchValue.trim())

  const { data: roomTypes = [], isLoading, error } = useRoomTypes(
    { keyword: deferredSearchValue || undefined },
    { enabled: isAdmin },
  )
  const createRoomType = useCreateRoomType()
  const updateRoomType = useUpdateRoomType()
  const deleteRoomType = useDeleteRoomType()

  const pageErrorMessage =
    (error instanceof Error && error.message) ||
    (createRoomType.error instanceof Error && createRoomType.error.message) ||
    (updateRoomType.error instanceof Error && updateRoomType.error.message) ||
    (deleteRoomType.error instanceof Error && deleteRoomType.error.message) ||
    null

  const columns = useMemo(
    () => [
      {
        key: 'name',
        header: 'Room Type',
        render: (item: RoomType) => (
          <div>
            <p className="font-semibold text-slate-900">{item.name}</p>
            <p className="text-xs text-slate-500">{item.description || 'No description'}</p>
          </div>
        ),
      },
      {
        key: 'capacity',
        header: 'Capacity',
        render: (item: RoomType) => `${item.capacity} guests`,
      },
      {
        key: 'price',
        header: 'Price Per Night',
        render: (item: RoomType) => formatCurrency(item.price),
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (item: RoomType) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingRoomType(item)
                setModalOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(`Delete room type ${item.name}? This is only allowed when no rooms still reference it.`)) {
                  deleteRoomType.mutate(item.id, {
                    onSuccess: () => {
                      setFeedbackMessage(`Room type ${item.name} deleted successfully.`)
                    },
                  })
                }
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [deleteRoomType],
  )

  const handleCreate = (data: CreateRoomTypeRequest) => {
    createRoomType.mutate(data, {
      onSuccess: (createdRoomType) => {
        setModalOpen(false)
        setEditingRoomType(null)
        setFeedbackMessage(`Room type ${createdRoomType.name} created successfully.`)
      },
    })
  }

  const handleUpdate = (data: UpdateRoomTypeRequest) => {
    if (!editingRoomType) {
      return
    }

    updateRoomType.mutate(
      { id: editingRoomType.id, data },
      {
        onSuccess: (updatedRoomType) => {
          setModalOpen(false)
          setEditingRoomType(null)
          setFeedbackMessage(`Room type ${updatedRoomType.name} updated successfully.`)
        },
      },
    )
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have access to the room type management area.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Room Type Management</h1>
          <p className="mt-1 font-medium text-slate-500">Manage pricing and capacity rules that rooms, availability, and billing rely on.</p>
        </div>

        <Button
          onClick={() => {
            setEditingRoomType(null)
            setModalOpen(true)
          }}
          className="rounded-2xl bg-primary-600 px-8 py-6 shadow-xl shadow-primary-200 hover:bg-primary-500"
        >
          <span className="material-symbols-outlined mr-2">add</span>
          Create Room Type
        </Button>
      </div>

      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}
      {feedbackMessage && <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{feedbackMessage}</div>}

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="Room Type Catalog"
          subtitle={`Showing ${roomTypes.length} room types`}
          icon="hotel_class"
          action={
            <div className="group flex w-72 items-center rounded-xl border border-slate-100 bg-slate-50 px-3 p-1 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100">
              <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
              <input
                type="text"
                placeholder="Search by name or description..."
                className="w-full border-none bg-transparent px-2 py-1.5 text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          }
        />
        <CardContent noPadding>
          <Table
            columns={columns}
            data={roomTypes}
            keyExtractor={(item) => item.id}
            loading={isLoading}
            emptyMessage="No room types match the current filters."
          />
        </CardContent>
      </Card>

      <RoomTypeFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingRoomType(null)
        }}
        roomType={editingRoomType}
        loading={createRoomType.isPending || updateRoomType.isPending}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </div>
  )
}
