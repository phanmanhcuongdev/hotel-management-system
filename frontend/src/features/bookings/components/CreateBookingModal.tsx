import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Button } from '../../../components/ui'
import type { Room } from '../../../types'
import { useEffect, useState } from 'react'

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Vui lòng nhập tên khách hàng'),
  phoneNumber: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  roomId: z.string().min(1, 'Vui lòng chọn phòng'),
  checkIn: z.string().min(1, 'Vui lòng chọn ngày nhận phòng'),
  checkOut: z.string().min(1, 'Vui lòng chọn ngày trả phòng'),
}).refine((data) => {
  const checkIn = new Date(data.checkIn)
  const checkOut = new Date(data.checkOut)
  return checkOut > checkIn
}, {
  message: 'Ngày trả phòng phải sau ngày nhận phòng',
  path: ['checkOut'],
})

type BookingFormData = z.infer<typeof bookingSchema>

interface CreateBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { guestName: string; phoneNumber: string; email?: string; roomId: number; checkIn: string; checkOut: string }) => void
  availableRooms: Room[]
  loading?: boolean
}

export function CreateBookingModal({ isOpen, onClose, onSubmit, availableRooms, loading }: CreateBookingModalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const getRoomTypeName = (room?: Room) => room?.type?.name ?? 'Unknown type'
  const getRoomTypeShortName = (room?: Room) => getRoomTypeName(room).slice(0, 3).toUpperCase()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: '',
      phoneNumber: '',
      email: '',
      roomId: '',
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  })

  const handleClose = () => {
    reset()
    setSelectedRoomId(null)
    onClose()
  }

  const handleFormSubmit = (data: BookingFormData) => {
    onSubmit({
      guestName: data.guestName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      roomId: parseInt(data.roomId),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    })
  }

  const handleRoomSelect = (id: string) => {
    setSelectedRoomId(id)
    setValue('roomId', id, { shouldValidate: true })
  }

  useEffect(() => {
    if (!selectedRoomId) {
      return
    }

    const selectedRoomStillExists = availableRooms.some((room) => room.id.toString() === selectedRoomId)

    if (!selectedRoomStillExists) {
      setSelectedRoomId(null)
      setValue('roomId', '', { shouldValidate: true })
    }
  }, [availableRooms, selectedRoomId, setValue])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Tạo Đơn Đặt Phòng Mới" size="xl">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col lg:flex-row gap-10">
        {/* Left: Customer & Date Info */}
        <div className="flex-1 space-y-6">
          <div className="rounded-[2rem] bg-slate-50 p-8 border border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">person</span>
              Thông tin khách hàng
            </h3>
            <div className="space-y-4">
              <Input
                id="guestName"
                label="Họ và Tên Khách Hàng"
                placeholder="Ví dụ: Nguyễn Văn A"
                error={errors.guestName?.message}
                {...register('guestName')}
                className="bg-white border-none shadow-sm rounded-xl"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="phoneNumber"
                  label="Số Điện Thoại"
                  placeholder="09xx xxx xxx"
                  error={errors.phoneNumber?.message}
                  {...register('phoneNumber')}
                  className="bg-white border-none shadow-sm rounded-xl"
                />
                <Input
                  id="email"
                  label="Email (Không bắt buộc)"
                  placeholder="khachhang@gmail.com"
                  error={errors.email?.message}
                  {...register('email')}
                  className="bg-white border-none shadow-sm rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-50 p-8 border border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              Thời gian lưu trú
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="checkIn"
                label="Ngày Nhận Phòng"
                type="date"
                error={errors.checkIn?.message}
                {...register('checkIn')}
                className="bg-white border-none shadow-sm rounded-xl"
              />
              <Input
                id="checkOut"
                label="Ngày Trả Phòng"
                type="date"
                error={errors.checkOut?.message}
                {...register('checkOut')}
                className="bg-white border-none shadow-sm rounded-xl"
              />
            </div>
          </div>

          {selectedRoomId && (
             <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200 animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
                 <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-12" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400 mb-2 relative z-10">Phòng đã chọn</p>
                 <div className="flex items-center justify-between relative z-10">
                   <div>
                     <h4 className="text-4xl font-black italic tracking-tighter">PHÒNG {availableRooms.find(r => r.id.toString() === selectedRoomId)?.roomNumber ?? '---'}</h4>
                     <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                       {getRoomTypeName(availableRooms.find(r => r.id.toString() === selectedRoomId))} Class
                     </p>
                   </div>
                  <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur">
                    <span className="material-symbols-outlined text-primary-400 text-[32px]">key</span>
                  </div>
                </div>
             </div>
          )}
        </div>

        {/* Right: Visual Room Picker */}
        <div className="w-full lg:w-[480px] flex flex-col">
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">bed</span>
              Chọn Phòng ({availableRooms.length})
            </h3>
            {errors.roomId && <span className="text-xs font-bold text-rose-500 animate-pulse">{errors.roomId.message}</span>}
          </div>

          <div className="flex-1 bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 overflow-y-auto max-h-[450px] no-scrollbar shadow-inner">
            <div className="grid grid-cols-4 gap-4">
              {availableRooms.map((room) => {
                const isSelected = selectedRoomId === room.id.toString()
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => handleRoomSelect(room.id.toString())}
                    className={`group relative flex flex-col items-center justify-center aspect-square rounded-[1.5rem] border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-200 scale-110 z-10' 
                        : 'bg-white border-transparent text-slate-600 hover:border-primary-200 hover:text-primary-600 hover:scale-105'
                    }`}
                  >
                    <span className="text-base font-black italic tabular-nums">{room.roomNumber}</span>
                    <span className={`text-[8px] font-black uppercase tracking-tighter mt-1 ${isSelected ? 'opacity-60' : 'text-slate-400'}`}>
                      {getRoomTypeShortName(room)}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-primary-600 text-[12px] font-black">check</span>
                      </div>
                    )}
                  </button>
                )
              })}
              {availableRooms.length === 0 && (
                <div className="col-span-4 py-24 text-center text-slate-300">
                  <span className="material-symbols-outlined text-[64px] opacity-10">hotel_class</span>
                  <p className="text-xs font-black uppercase tracking-widest mt-4">Hiện không có phòng trống</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Button type="button" variant="ghost" onClick={handleClose} className="flex-1 rounded-2xl py-7 font-black uppercase tracking-widest text-xs hover:bg-slate-50">
              Hủy Bỏ
            </Button>
            <Button type="submit" loading={loading} className="flex-[2] rounded-2xl bg-slate-900 py-7 font-black uppercase tracking-widest text-xs text-white shadow-2xl shadow-slate-300 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Xác Nhận Đặt Phòng
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
