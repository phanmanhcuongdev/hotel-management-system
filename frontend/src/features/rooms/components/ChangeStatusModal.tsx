import { Modal, Button } from '../../../components/ui'
import type { Room, RoomStatus } from '../../../types'
import { useState, useEffect } from 'react'

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
    desc: 'Phòng đã dọn dẹp, sẵn sàng đón khách.'
  },
  { 
    value: 'OCCUPIED', 
    label: 'Đang ở', 
    icon: 'person_pin', 
    color: 'text-rose-500', 
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    desc: 'Khách đang lưu trú tại phòng.'
  },
  { 
    value: 'MAINTENANCE', 
    label: 'Bảo trì', 
    icon: 'build', 
    color: 'text-slate-400', 
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    desc: 'Đang sửa chữa hoặc cần vệ sinh.'
  },
]

export function ChangeStatusModal({ isOpen, onClose, onSubmit, room, loading }: ChangeStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<RoomStatus>('AVAILABLE')

  useEffect(() => {
    if (room) {
      setSelectedStatus(room.status)
    }
  }, [room, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(selectedStatus)
  }

  if (!room) return null

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Cập Nhật Trạng Thái: Phòng ${room.roomNumber}`} 
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-bold text-slate-500">Chọn trạng thái vận hành mới:</p>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
             Hiện tại: {room.status}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {STATUS_OPTIONS.map((opt) => {
            const isActive = selectedStatus === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedStatus(opt.value)}
                className={`group relative flex items-center gap-5 p-5 rounded-[1.5rem] border-2 transition-all duration-300 ${
                  isActive 
                    ? `bg-white ${opt.border} shadow-xl shadow-slate-200 ring-4 ring-primary-50` 
                    : 'bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-100'
                }`}
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                  isActive ? `${opt.bg} ${opt.color} scale-110 shadow-sm` : 'bg-white text-slate-300'
                }`}>
                  <span className="material-symbols-outlined text-[32px]">{opt.icon}</span>
                </div>
                
                <div className="text-left flex-1 min-w-0">
                  <p className={`text-base font-black italic uppercase tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                    {opt.label}
                  </p>
                  <p className={`mt-0.5 text-xs font-medium truncate ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                    {opt.desc}
                  </p>
                </div>

                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'bg-primary-600 border-primary-600 shadow-lg' : 'border-slate-200'
                }`}>
                  {isActive && <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onClose} 
            className="flex-1 rounded-2xl py-6 font-bold hover:bg-slate-50"
          >
            Bỏ Qua
          </Button>
          <Button 
            type="submit" 
            loading={loading} 
            className="flex-[2] rounded-2xl bg-slate-900 py-6 font-bold shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Xác Nhận Thay Đổi
          </Button>
        </div>
      </form>
    </Modal>
  )
}
