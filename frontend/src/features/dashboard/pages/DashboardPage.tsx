import { Card, CardHeader, CardContent, Button } from '../../../components/ui'
import { StatsCard } from '../components'
import { useRooms } from '../../rooms/hooks/useRooms'
import { useBookings } from '../../bookings/hooks/useBookings'
import { BookingStatusBadge } from '../../bookings/components'
import { useNavigate } from 'react-router-dom'

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
          icon="hotel"
          color="blue"
        />
        <StatsCard
          title="Available"
          value={availableRooms}
          icon="check_circle"
          color="green"
        />
        <StatsCard
          title="Occupied"
          value={occupiedRooms}
          icon="person_pin"
          color="yellow"
        />
        <StatsCard
          title="Maintenance"
          value={maintenanceRooms}
          icon="build"
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
                      <span className="font-medium">Room {booking.room?.roomNumber ?? '—'}</span>
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
                      <span className="font-medium">Room {booking.room?.roomNumber ?? '—'}</span>
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
                      Room {booking.room?.roomNumber ?? '—'} | {booking.checkIn} - {booking.checkOut}
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
