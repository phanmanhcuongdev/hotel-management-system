import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookingListPage from './BookingListPage'

const useAuthMock = vi.fn()
const useBookingMock = vi.fn()
const useBookingsMock = vi.fn()
const useCreateBookingMock = vi.fn()
const useCheckInBookingMock = vi.fn()
const useCheckOutBookingMock = vi.fn()
const useUpdateBookingMock = vi.fn()
const useUpdateBookingDetailsMock = vi.fn()
const useCancelBookingMock = vi.fn()

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => useAuthMock(),
}))

vi.mock('../hooks/useBookings', () => ({
  useBooking: (...args: unknown[]) => useBookingMock(...args),
  useBookings: (...args: unknown[]) => useBookingsMock(...args),
  useCreateBooking: () => useCreateBookingMock(),
  useCheckInBooking: () => useCheckInBookingMock(),
  useCheckOutBooking: () => useCheckOutBookingMock(),
  useUpdateBooking: () => useUpdateBookingMock(),
  useUpdateBookingDetails: () => useUpdateBookingDetailsMock(),
  useCancelBooking: () => useCancelBookingMock(),
}))

describe('BookingListPage', () => {
  beforeEach(() => {
    useBookingMock.mockReset()
    useBookingsMock.mockReset()
    useCreateBookingMock.mockReset()
    useCheckInBookingMock.mockReset()
    useCheckOutBookingMock.mockReset()
    useUpdateBookingMock.mockReset()
    useUpdateBookingDetailsMock.mockReset()
    useCancelBookingMock.mockReset()
    useAuthMock.mockReset()

    useCreateBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useCheckInBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useCheckOutBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useUpdateBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useUpdateBookingDetailsMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useCancelBookingMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useBookingMock.mockReturnValue({ data: null, error: null })
  })

  it('shows access denied state for non-admin and disables data queries', () => {
    useAuthMock.mockReturnValue({
      user: { id: '2', name: 'Staff User', email: 'staff@hotel.local', role: 'STAFF', initials: 'SU' },
    })
    useBookingsMock.mockReturnValue({ data: [], isLoading: false, error: null })

    render(
      <MemoryRouter>
        <BookingListPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/You do not have permission to access booking management/i)).toBeInTheDocument()
    expect(useBookingsMock).toHaveBeenCalledWith({ keyword: undefined }, { enabled: false })
  })
})
