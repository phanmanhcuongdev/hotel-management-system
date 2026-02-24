import { Card, CardHeader, CardContent, Button } from '../../../components/ui'
import { StatsCard } from '../components'
import { useRooms } from '../../rooms/hooks/useRooms'
import { useBookings } from '../../bookings/hooks/useBookings'
import { BookingStatusBadge } from '../../bookings/components'
import { useNavigate } from 'react-router-dom'

function RoomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  )
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data: rooms = [] } = useRooms()
  const { data: bookings = [] } = useBookings()

  const totalRooms = rooms.length
  const availableRooms = rooms.filter((r) => r.status === 'AVAILABLE').length
  const occupiedRooms = rooms.filter((r) => r.status === 'OCCUPIED').length
  const maintenanceRooms = rooms.filter((r) => r.status === 'MAINTENANCE').length

  const today = new Date().toISOString().split('T')[0]
  const todayCheckIns = bookings.filter((b) => b.checkIn === today && b.status !== 'CANCELLED')
  const todayCheckOuts = bookings.filter((b) => b.checkOut === today && b.status !== 'CANCELLED')
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Rooms"
          value={totalRooms}
          icon={<RoomIcon className="h-6 w-6" />}
          color="blue"
        />
        <StatsCard
          title="Available"
          value={availableRooms}
          icon={<CheckIcon className="h-6 w-6" />}
          color="green"
        />
        <StatsCard
          title="Occupied"
          value={occupiedRooms}
          icon={<CalendarIcon className="h-6 w-6" />}
          color="yellow"
        />
        <StatsCard
          title="Maintenance"
          value={maintenanceRooms}
          icon={<WrenchIcon className="h-6 w-6" />}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader title="Quick Actions" />
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/bookings')}>New Booking</Button>
            <Button variant="secondary" onClick={() => navigate('/rooms')}>
              Manage Rooms
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title={`Today's Check-ins (${todayCheckIns.length})`} />
          <CardContent>
            {todayCheckIns.length === 0 ? (
              <p className="text-gray-500 text-sm">No check-ins scheduled for today</p>
            ) : (
              <ul className="space-y-3">
                {todayCheckIns.map((booking) => (
                  <li key={booking.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <span className="font-medium">Room {booking.room.roomNumber}</span>
                      <span className="text-gray-500 text-sm ml-2">Booking #{booking.id}</span>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={`Today's Check-outs (${todayCheckOuts.length})`} />
          <CardContent>
            {todayCheckOuts.length === 0 ? (
              <p className="text-gray-500 text-sm">No check-outs scheduled for today</p>
            ) : (
              <ul className="space-y-3">
                {todayCheckOuts.map((booking) => (
                  <li key={booking.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <span className="font-medium">Room {booking.room.roomNumber}</span>
                      <span className="text-gray-500 text-sm ml-2">Booking #{booking.id}</span>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pending Bookings */}
      {pendingBookings.length > 0 && (
        <Card>
          <CardHeader
            title={`Pending Bookings (${pendingBookings.length})`}
            action={
              <Button variant="secondary" size="sm" onClick={() => navigate('/bookings')}>
                View All
              </Button>
            }
          />
          <CardContent>
            <ul className="space-y-3">
              {pendingBookings.slice(0, 5).map((booking) => (
                <li key={booking.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <span className="font-medium">Booking #{booking.id}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      Room {booking.room.roomNumber} | {booking.checkIn} - {booking.checkOut}
                    </span>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
