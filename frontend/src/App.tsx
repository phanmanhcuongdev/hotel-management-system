import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import RoomListPage from './features/rooms/pages/RoomListPage'
import BookingListPage from './features/bookings/pages/BookingListPage'
import LoginPage from './features/auth/LoginPage'
import ChangePasswordPage from './features/auth/ChangePasswordPage'
import UserListPage from './features/users/pages/UserListPage'
import ReportsPage from './features/reports/pages/ReportsPage'
import BillLedgerPage from './features/billing/pages/BillLedgerPage'
import BillDetailPage from './features/billing/pages/BillDetailPage'
import ClientListPage from './features/clients/pages/ClientListPage'
import ClientDetailPage from './features/clients/pages/ClientDetailPage'
import RoomTypeListPage from './features/room-types/pages/RoomTypeListPage'
import ServiceCatalogPage from './features/services/pages/ServiceCatalogPage'
import PropertyProfilePage from './features/property/pages/PropertyProfilePage'
import { ProtectedRoute } from './features/auth/ProtectedRoute'
import { PublicOnlyRoute } from './features/auth/PublicOnlyRoute'

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rooms" element={<RoomListPage />} />
          <Route path="room-types" element={<RoomTypeListPage />} />
          <Route path="bookings" element={<BookingListPage />} />
          <Route path="services" element={<ServiceCatalogPage />} />
          <Route path="clients" element={<ClientListPage />} />
          <Route path="clients/:id" element={<ClientDetailPage />} />
          <Route path="property" element={<PropertyProfilePage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="billing" element={<BillLedgerPage />} />
          <Route path="billing/:id" element={<BillDetailPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
