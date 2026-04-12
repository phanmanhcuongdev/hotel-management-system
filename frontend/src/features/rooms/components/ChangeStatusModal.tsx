import { useEffect, useState } from 'react'
import { Button, Modal } from '../../../components/ui'
import type { Room, RoomStatus } from '../../../types'

interface ChangeStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (status: RoomStatus) => void
  room: Room | null
  loading?: boolean
}

const STATUS_OPTIONS: { value: RoomStatus; label: string; icon: string; color: string; bg: string; border: string; desc: string }[] = [
  {
    value: 'AVAILABLE',
    label: 'Sẵn sàng',
    icon: 'check_circle',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    desc: 'Phòng đã dọn dẹp, sẵn sàng đón khách.',
  },
  {
    value: 'OCCUPIED',
    label: 'Đang ở',
    icon: 'person_pin',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    desc: 'Khách đang lưu trú tại phòng.',
  },
  {
    value: 'MAINTENANCE',
    label: 'Bảo trì',
    icon: 'build',
    color: 'text-slate-400',
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    desc: 'Đang sửa chữa hoặc cần vệ sinh.',
  },
]

export function ChangeStatusModal({ isOpen, onClose, onSubmit, room, loading }: ChangeStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<RoomStatus>('AVAILABLE')

  useEffect(() => {
    if (room) {
      setSelectedStatus(room.status)
    }
  }, [isOpen, room])

  if (!room) return null

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(selectedStatus)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Cập nhật trạng thái: Phòng ${room.roomNumber}`} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-bold text-slate-500">Chọn trạng thái vận hành mới:</p>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Hiện tại: {room.status}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {STATUS_OPTIONS.map((option) => {
            const isActive = selectedStatus === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedStatus(option.value)}
                className={`group relative flex items-center gap-5 rounded-[1.5rem] border-2 p-5 transition-all duration-300 ${
                  isActive ? `bg-white ${option.border} shadow-xl shadow-slate-200 ring-4 ring-primary-50` : 'border-transparent bg-slate-50/50 hover:border-slate-100 hover:bg-white'
                }`}
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive ? `${option.bg} ${option.color} scale-110 shadow-sm` : 'bg-white text-slate-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[32px]">{option.icon}</span>
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p className={`text-base font-black italic uppercase tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{option.label}</p>
                  <p className={`mt-0.5 truncate text-xs font-medium ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>{option.desc}</p>
                </div>

                <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${isActive ? 'border-primary-600 bg-primary-600 shadow-lg' : 'border-slate-200'}`}>
                  {isActive && <span className="material-symbols-outlined text-[14px] font-black text-white">check</span>}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-2xl py-6 font-bold hover:bg-slate-50">
            Bỏ qua
          </Button>
          <Button type="submit" loading={loading} className="flex-[2] rounded-2xl bg-slate-900 py-6 font-bold shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Xác nhận thay đổi
          </Button>
        </div>
      </form>
    </Modal>
  )
}
