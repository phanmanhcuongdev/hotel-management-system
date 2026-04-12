import { fireEvent, render, screen } from '@testing-library/react'
import { UpdateStatusModal } from './UpdateStatusModal'
import type { Booking } from '../../../types'

function booking(status: Booking['status']): Booking {
  return {
    id: 1,
    guestName: 'Alice',
    phoneNumber: '0123456789',
    discount: 0,
    note: null,
    bookedBy: null,
    room: { id: 101, roomNumber: '101', type: { id: 1, name: 'Standard' } },
    checkIn: '2026-04-20',
    checkOut: '2026-04-22',
    status,
    checkedIn: false,
  }
}

describe('UpdateStatusModal', () => {
  it('only shows valid transitions for pending booking', () => {
    render(
      <UpdateStatusModal
        isOpen
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        booking={booking('PENDING')}
      />
    )

    expect(screen.getByRole('option', { name: 'Confirmed' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Cancelled' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Completed' })).not.toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Pending' })).not.toBeInTheDocument()
  })

  it('resets available transition options when booking changes', () => {
    const { rerender } = render(
      <UpdateStatusModal
        isOpen
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        booking={booking('PENDING')}
      />
    )

    fireEvent.change(screen.getByLabelText('New Status'), { target: { value: 'CANCELLED' } })
    expect(screen.getByDisplayValue('Cancelled')).toBeInTheDocument()

    rerender(
      <UpdateStatusModal
        isOpen
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        booking={booking('CONFIRMED')}
      />
    )

    expect(screen.getByRole('option', { name: 'Cancelled' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Confirmed' })).not.toBeInTheDocument()
    expect(screen.getByDisplayValue('Cancelled')).toBeInTheDocument()
  })
})
