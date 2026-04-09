import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Input, Modal } from '../../../components/ui'
import type { Room } from '../../../types'

const roomSchema = z.object({
  roomNumber: z.string().min(1, 'Số phòng không được để trống'),
  roomTypeId: z.string().min(1, 'Vui lòng chọn loại phòng'),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']),
})

type RoomFormData = z.infer<typeof roomSchema>

interface RoomFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RoomFormData) => void
  room?: Room
  loading?: boolean
}

const ROOM_TYPES = [
  { id: '1', name: 'Standard', icon: 'bed', desc: 'Phòng tiêu chuẩn, đầy đủ tiện nghi cơ bản.', price: '500k' },
  { id: '2', name: 'Deluxe', icon: 'king_bed', desc: 'Không gian rộng rãi, nội thất cao cấp.', price: '1.2M' },
  { id: '3', name: 'Suite', icon: 'apartment', desc: 'Đẳng cấp thượng lưu, view toàn thành phố.', price: '3.5M' },
]

const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: 'Sẵn sàng', icon: 'check_circle', color: 'text-emerald-500' },
  { value: 'OCCUPIED', label: 'Đang ở', icon: 'person_pin', color: 'text-rose-500' },
  { value: 'MAINTENANCE', label: 'Bảo trì', icon: 'build', color: 'text-slate-400' },
] as const

export function RoomFormModal({ isOpen, onClose, onSubmit, room, loading }: RoomFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    values: room
      ? {
          roomNumber: room.roomNumber,
          roomTypeId: String(room.type?.id ?? 1),
          status: room.status,
        }
      : {
          roomNumber: '',
          roomTypeId: '1',
          status: 'AVAILABLE',
        },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={room ? 'Cập nhật thông tin phòng' : 'Thêm phòng nghỉ mới'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            id="roomNumber"
            label="Số phòng (Ví dụ: 101, 202...)"
            placeholder="Nhập số phòng..."
            error={errors.roomNumber?.message}
            {...register('roomNumber')}
            className="rounded-2xl border-slate-200 focus:ring-primary-100"
          />

          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-slate-700">Trạng thái ban đầu</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-1">
                  {STATUS_OPTIONS.map((option) => {
                    const isActive = field.value === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => field.onChange(option.value)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all ${
                          isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[16px] ${isActive ? option.color : ''}`}>{option.icon}</span>
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="ml-1 flex items-center justify-between">
            <label className="text-sm font-bold text-slate-700">Chọn loại phòng</label>
            {errors.roomTypeId && <span className="animate-pulse text-xs font-bold text-rose-500">{errors.roomTypeId.message}</span>}
          </div>

          <Controller
            name="roomTypeId"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {ROOM_TYPES.map((type) => {
                  const isActive = field.value === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => field.onChange(type.id)}
                      className={`group relative flex flex-col rounded-[2rem] border-2 p-5 text-left transition-all duration-300 ${
                        isActive ? 'border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-200' : 'border-slate-100 bg-white text-slate-600 hover:border-primary-200'
                      }`}
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${isActive ? 'bg-white/10 text-primary-400' : 'bg-slate-50 text-slate-400'}`}>
                        <span className="material-symbols-outlined text-[28px]">{type.icon}</span>
                      </div>
                      <p className="text-base font-black italic uppercase tracking-tight">{type.name}</p>
                      <p className={`mt-1 text-[10px] font-medium leading-relaxed ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>{type.desc}</p>
                      <div className={`mt-4 text-sm font-black ${isActive ? 'text-primary-400' : 'text-slate-900'}`}>
                        {type.price} <span className="text-[10px] font-bold opacity-60">/ đêm</span>
                      </div>
                      {isActive && (
                        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 shadow-lg">
                          <span className="material-symbols-outlined text-[14px] font-black text-white">check</span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={handleClose} className="flex-1 rounded-2xl py-6 font-bold hover:bg-slate-50">
            Hủy bỏ
          </Button>
          <Button type="submit" loading={loading} className="flex-[2] rounded-2xl bg-slate-900 py-6 font-bold shadow-xl shadow-slate-200">
            {room ? 'Lưu thay đổi' : 'Xác nhận thêm phòng'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
