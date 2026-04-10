import { render, screen } from '@testing-library/react'
import BookingListPage from './BookingListPage'

const useAuthMock = vi.fn()
const useBookingsMock = vi.fn()
const useRoomsMock = vi.fn()
const useCreateBookingMock = vi.fn()
const useUpdateBookingMock = vi.fn()
const useCancelBookingMock = vi.fn()

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => useAuthMock(),
}))

vi.mock('../hooks/useBookings', () => ({
  useBookings: (...args: unknown[]) => useBookingsMock(...args),
  useCreateBooking: () => useCreateBookingMock(),
  useUpdateBooking: () => useUpdateBookingMock(),
  useCancelBooking: () => useCancelBookingMock(),
}))

vi.mock('../../rooms/hooks/useRooms', () => ({
  useRooms: (...args: unknown[]) => useRoomsMock(...args),
}))

describe('BookingListPage', () => {
  beforeEach(() => {
    useBookingsMock.mockReset()
    useRoomsMock.mockReset()
    useCreateBookingMock.mockReset()
    useUpdateBookingMock.mockReset()
    useCancelBookingMock.mockReset()
    useAuthMock.mockReset()

    useCreateBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useUpdateBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useCancelBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
  })

  it('shows access denied state for non-admin and disables data queries', () => {
    useAuthMock.mockReturnValue({
      user: { id: '2', name: 'Staff User', email: 'staff@hotel.local', role: 'STAFF', initials: 'SU' },
    })
    useBookingsMock.mockReturnValue({ data: [], isLoading: false, error: null })
    useRoomsMock.mockReturnValue({ data: [], error: null })

    render(<BookingListPage />)

    expect(screen.getByText(/Ban khong co quyen truy cap khu vuc quan ly dat phong/i)).toBeInTheDocument()
    expect(useBookingsMock).toHaveBeenCalledWith({ enabled: false })
    expect(useRoomsMock).toHaveBeenCalledWith('AVAILABLE', { enabled: false })
  })
})
