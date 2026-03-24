import { Card, CardHeader, CardContent, Button } from '../../../components/ui'
import { StatsCard } from '../components'
import { useRooms } from '../../rooms/hooks/useRooms'
import { useBookings } from '../../bookings/hooks/useBookings'
import { BookingStatusBadge } from '../../bookings/components'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data: roomsData = [] } = useRooms()
  const { data: bookingsData = [] } = useBookings()

  const rooms = Array.isArray(roomsData) ? roomsData : []
  const bookings = Array.isArray(bookingsData) ? bookingsData : []
  const getBookingRoomNumber = (booking: (typeof bookings)[number]) => booking.room?.roomNumber ?? '---'
  const getRoomTypeName = (booking: (typeof bookings)[number]) => booking.room?.roomType?.name ?? booking.room?.type?.name ?? 'Chua co loai phong'

  const totalRooms = rooms.length
  const availableRooms = rooms.filter((r) => r.status === 'AVAILABLE').length
  const occupiedRooms = rooms.filter((r) => r.status === 'OCCUPIED').length
  const maintenanceRooms = rooms.filter((r) => r.status === 'MAINTENANCE').length

  const today = new Date().toISOString().split('T')[0]
  const todayCheckIns = bookings.filter((b) => b.checkIn === today && b.status !== 'CANCELLED')
  const todayCheckOuts = bookings.filter((b) => b.checkOut === today && b.status !== 'CANCELLED')
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING')

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-2">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 to-slate-800 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-12" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight italic">XIN CHÀO VẬN HÀNH!</h1>
          <p className="mt-2 text-slate-400 font-medium text-lg max-w-md">
            Hôm nay khách sạn có <span className="text-primary-400 font-bold">{todayCheckIns.length} lượt check-in</span> mới. Chúc bạn một ngày làm việc hiệu quả.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate('/bookings')}
              className="bg-primary-600 hover:bg-primary-500 rounded-2xl px-8 py-6 shadow-lg shadow-primary-900/20"
            >
              <span className="material-symbols-outlined mr-2">add_circle</span>
              Tạo Booking Mới
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/rooms')}
              className="bg-white/10 hover:bg-white/20 text-white border-none rounded-2xl px-8 py-6 backdrop-blur-sm"
            >
              Xem Sơ Đồ Phòng
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-2 relative z-10">
          <div className="text-5xl font-black text-primary-400 tracking-tighter tabular-nums">
            {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng số phòng"
          value={totalRooms}
          icon="hotel"
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Phòng trống"
          value={availableRooms}
          icon="check_circle"
          color="green"
        />
        <StatsCard
          title="Đang ở"
          value={occupiedRooms}
          icon="person_pin"
          color="yellow"
        />
        <StatsCard
          title="Bảo trì"
          value={maintenanceRooms}
          icon="build"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Check-ins List */}
        <Card className="lg:col-span-2">
          <CardHeader 
            title="Check-ins Hôm Nay" 
            subtitle="Danh sách khách hàng dự kiến nhận phòng trong ngày"
            icon="login"
            action={
              <Button variant="ghost" size="sm" className="rounded-xl font-bold text-primary-600 hover:bg-primary-50">
                Tất cả lượt đến
              </Button>
            }
          />
          <CardContent noPadding>
            {todayCheckIns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <span className="material-symbols-outlined text-[48px] opacity-20 mb-4">event_busy</span>
                <p className="font-medium">Không có lượt check-in nào trong hôm nay</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      <th className="px-8 py-4">Mã Đơn</th>
                      <th className="px-8 py-4">Thông Tin Phòng</th>
                      <th className="px-8 py-4">Trạng Thái</th>
                      <th className="px-8 py-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {todayCheckIns.map((booking) => (
                      <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <span className="font-mono font-bold text-slate-900">#{booking.id}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                              {getBookingRoomNumber(booking)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Phòng {getBookingRoomNumber(booking)}</p>
                              <p className="text-xs font-medium text-slate-500">{getRoomTypeName(booking)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <BookingStatusBadge status={booking.status} />
                        </td>
                        <td className="px-8 py-5 text-right">
                          <Button variant="ghost" size="sm" className="rounded-xl group-hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                            Chi tiết
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Pending Bookings & Check-outs */}
        <div className="space-y-8">
          <Card>
            <CardHeader 
              title="Đơn Chờ Xử Lý" 
              subtitle="Cần duyệt sớm"
              icon="pending_actions"
            />
            <CardContent>
              {pendingBookings.length === 0 ? (
                <p className="text-slate-400 text-sm font-medium py-4 text-center">Mọi thứ đã được xử lý xong!</p>
              ) : (
                <div className="space-y-4">
                  {pendingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 transition-transform hover:scale-[1.02]">
                      <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">Booking #{booking.id}</p>
                         <p className="text-xs font-medium text-slate-500 mt-0.5">Phòng {getBookingRoomNumber(booking)} • {booking.checkIn}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 rounded-lg p-0 text-amber-600 hover:bg-amber-100">
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader 
              title="Check-outs" 
              subtitle="Trong ngày hôm nay"
              icon="logout"
            />
            <CardContent>
              <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-900 text-white shadow-xl shadow-slate-200 overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-2 bg-emerald-500" />
                <div className="relative z-10">
                  <p className="text-3xl font-black italic">{todayCheckOuts.length}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Lượt trả phòng</p>
                </div>
                <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur relative z-10">
                  <span className="material-symbols-outlined text-[32px] text-emerald-400">key_off</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
