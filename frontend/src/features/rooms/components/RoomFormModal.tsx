import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Button } from '../../../components/ui'
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
]

export function RoomFormModal({ isOpen, onClose, onSubmit, room, loading }: RoomFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: room
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
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={room ? 'Cập Nhật Thông Tin Phòng' : 'Thêm Phòng Nghỉ Mới'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="roomNumber"
            label="Số Phòng (Ví dụ: 101, 202...)"
            placeholder="Nhập số phòng..."
            error={errors.roomNumber?.message}
            {...register('roomNumber')}
            className="rounded-2xl border-slate-200 focus:ring-primary-100"
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Trạng thái ban đầu</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                  {STATUS_OPTIONS.map((opt) => {
                    const isActive = field.value === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => field.onChange(opt.value)}
                        className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                          isActive ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[16px] ${isActive ? opt.color : ''}`}>
                          {opt.icon}
                        </span>
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>
        </div>

        {/* Room Type Visual Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-slate-700">Chọn loại phòng</label>
            {errors.roomTypeId && <span className="text-xs font-bold text-rose-500 animate-pulse">{errors.roomTypeId.message}</span>}
          </div>
          
          <Controller
            name="roomTypeId"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROOM_TYPES.map((type) => {
                  const isActive = field.value === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => field.onChange(type.id)}
                      className={`group relative flex flex-col text-left p-5 rounded-[2rem] border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200' 
                          : 'bg-white border-slate-100 text-slate-600 hover:border-primary-200'
                      }`}
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                        isActive ? 'bg-white/10 text-primary-400' : 'bg-slate-50 text-slate-400'
                      }`}>
                        <span className="material-symbols-outlined text-[28px]">{type.icon}</span>
                      </div>
                      <p className="text-base font-black italic uppercase tracking-tight">{type.name}</p>
                      <p className={`mt-1 text-[10px] font-medium leading-relaxed ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                        {type.desc}
                      </p>
                      <div className={`mt-4 text-sm font-black ${isActive ? 'text-primary-400' : 'text-slate-900'}`}>
                        {type.price} <span className="text-[10px] font-bold opacity-60">/ đêm</span>
                      </div>
                      {isActive && (
                        <div className="absolute top-4 right-4 h-6 w-6 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>
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
            Hủy Bỏ
          </Button>
          <Button type="submit" loading={loading} className="flex-[2] rounded-2xl bg-slate-900 py-6 font-bold shadow-xl shadow-slate-200">
            {room ? 'Lưu Thay Đổi' : 'Xác Nhận Thêm Phòng'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
