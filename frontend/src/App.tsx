import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import RoomListPage from './features/rooms/pages/RoomListPage'
import BookingListPage from './features/bookings/pages/BookingListPage'
import LoginPage from './features/auth/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="rooms" element={<RoomListPage />} />
        <Route path="bookings" element={<BookingListPage />} />
      </Route>
    </Routes>
  )
}

export default App
