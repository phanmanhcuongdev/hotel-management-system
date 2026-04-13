import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BillLedgerPage from './BillLedgerPage'

const useAuthMock = vi.fn()
const useBillLedgerMock = vi.fn()

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => useAuthMock(),
}))

vi.mock('../hooks/useBillLedger', () => ({
  useBillLedger: (...args: unknown[]) => useBillLedgerMock(...args),
}))

describe('BillLedgerPage', () => {
  beforeEach(() => {
    useAuthMock.mockReset()
    useBillLedgerMock.mockReset()
  })

  it('shows access denied state for non-admin and disables bill query', () => {
    useAuthMock.mockReturnValue({
      user: { id: '2', name: 'Staff User', email: 'staff@hotel.local', role: 'STAFF', initials: 'SU' },
    })
    useBillLedgerMock.mockReturnValue({ data: [], isLoading: false, error: null })

    render(
      <MemoryRouter>
        <BillLedgerPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/You do not have permission to access billing operations/i)).toBeInTheDocument()
    expect(useBillLedgerMock).toHaveBeenCalledWith(
      {
        keyword: undefined,
        bookingId: undefined,
        paymentType: undefined,
        paymentDateFrom: undefined,
        paymentDateTo: undefined,
      },
      { enabled: false },
    )
  })

  it('shows review-booking links for bill results and validates invalid date filters', () => {
    useAuthMock.mockReturnValue({
      user: { id: '1', name: 'Admin User', email: 'admin@hotel.local', role: 'ADMIN', initials: 'AU' },
    })
    useBillLedgerMock.mockReturnValue({
      data: [
        {
          billId: 17,
          bookingId: 23,
          guestName: 'Alex Johnson',
          roomNumber: '301',
          bookingStatus: 'COMPLETED',
          paymentAmount: 250,
          paymentType: 'CARD',
          paymentDate: '2026-04-12',
          note: 'Paid at checkout',
        },
      ],
      isLoading: false,
      error: null,
    })

    render(
      <MemoryRouter>
        <BillLedgerPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: '#23' })).toHaveAttribute('href', '/bookings?keyword=23&open=23')
    expect(screen.getByRole('link', { name: 'Review Booking' })).toHaveAttribute('href', '/bookings?keyword=23&open=23')

    fireEvent.change(screen.getByLabelText('From'), { target: { value: '2026-04-20' } })
    fireEvent.change(screen.getByLabelText('To'), { target: { value: '2026-04-10' } })
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filters' }))

    expect(screen.getByText(/payment date range is invalid/i)).toBeInTheDocument()
  })
})
