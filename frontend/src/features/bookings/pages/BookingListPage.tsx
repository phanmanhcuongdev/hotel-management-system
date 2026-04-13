import { useDeferredValue, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader } from '../../../components/ui'
import type { Booking, BookingStatus, CreateBookingRequest, UpdateBookingDetailsRequest } from '../../../types'
import { useAuth } from '../../auth/useAuth'
import { notifySuccess } from '../../notifications/notificationStore'
import { BookingDetailModal, BookingTable, CreateBookingModal, UpdateStatusModal } from '../components'
import { EditBookingDetailsModal } from '../components/EditBookingDetailsModal'
import { useBooking, useBookings, useCancelBooking, useCheckInBooking, useCheckOutBooking, useCreateBooking, useUpdateBooking, useUpdateBookingDetails } from '../hooks/useBookings'

export default function BookingListPage() {
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'
  const [searchParams, setSearchParams] = useSearchParams()
  const initialKeyword = searchParams.get('keyword')?.trim() || ''
  const initialOpenBookingId = Number(searchParams.get('open'))

  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [isEditDetailsModalOpen, setEditDetailsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [searchValue, setSearchValue] = useState(initialKeyword)
  const deferredSearchValue = useDeferredValue(searchValue.trim())
  const requestedBookingId = Number.isInteger(initialOpenBookingId) && initialOpenBookingId > 0 ? initialOpenBookingId : null

  const { data: bookings = [], isLoading, error: bookingsError } = useBookings(
    {
      keyword: deferredSearchValue || undefined,
    },
    { enabled: isAdmin }
  )
  const { data: requestedBooking, error: requestedBookingError } = useBooking(requestedBookingId ?? 0)
  const createBooking = useCreateBooking()
  const checkInBooking = useCheckInBooking()
  const checkOutBooking = useCheckOutBooking()
  const updateBooking = useUpdateBooking()
  const updateBookingDetails = useUpdateBookingDetails()
  const cancelBooking = useCancelBooking()

  const pageErrorMessage =
    (bookingsError instanceof Error && bookingsError.message) ||
    (createBooking.error instanceof Error && createBooking.error.message) ||
    (checkInBooking.error instanceof Error && checkInBooking.error.message) ||
    (checkOutBooking.error instanceof Error && checkOutBooking.error.message) ||
    (updateBooking.error instanceof Error && updateBooking.error.message) ||
    (updateBookingDetails.error instanceof Error && updateBookingDetails.error.message) ||
    (cancelBooking.error instanceof Error && cancelBooking.error.message) ||
    (requestedBookingError instanceof Error && requestedBookingError.message) ||
    null

  useEffect(() => {
    if (!requestedBookingId || isDetailModalOpen) {
      return
    }

    const bookingFromList = bookings.find((item) => item.id === requestedBookingId)
    if (bookingFromList) {
      setSelectedBooking(bookingFromList)
      setDetailModalOpen(true)
      return
    }

    if (requestedBooking?.id === requestedBookingId) {
      setSelectedBooking(requestedBooking)
      setDetailModalOpen(true)
    }
  }, [bookings, isDetailModalOpen, requestedBooking, requestedBookingId])

  useEffect(() => {
    const keywordFromUrl = searchParams.get('keyword')?.trim() || ''
    if (keywordFromUrl !== searchValue) {
      setSearchValue(keywordFromUrl)
    }
  }, [searchParams, searchValue])

  const clearOpenBookingParam = () => {
    if (!searchParams.get('open')) {
      return
    }

    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('open')
    setSearchParams(nextParams, { replace: true })
  }

  const handleViewDetails = (booking: Booking) => {
    if (!isAdmin) return
    setSelectedBooking(booking)
    setDetailModalOpen(true)
  }

  const handleEditDetails = (booking: Booking) => {
    if (!isAdmin) return
    setSelectedBooking(booking)
    setEditDetailsModalOpen(true)
  }

  const handleUpdateStatus = (booking: Booking) => {
    if (!isAdmin) return
    setSelectedBooking(booking)
    setUpdateModalOpen(true)
  }

  const handleCancel = (booking: Booking) => {
    if (!isAdmin) return

    if (confirm(`Are you sure you want to cancel booking #${booking.id}?`)) {
      cancelBooking.mutate(booking.id, {
        onSuccess: () => {
          notifySuccess('Booking cancelled', `Booking #${booking.id} was cancelled successfully.`)
        },
      })
    }
  }

  const handleCreateSubmit = (data: CreateBookingRequest) => {
    if (!isAdmin) return

    createBooking.mutate(data, {
      onSuccess: () => {
        setCreateModalOpen(false)
        notifySuccess('Booking created', 'Booking created successfully.')
      },
    })
  }

  const handleCheckIn = (booking: Booking) => {
    if (!isAdmin) return

    if (confirm(`Check in booking #${booking.id} for room ${booking.room?.roomNumber ?? ''}?`)) {
      checkInBooking.mutate(booking.id, {
        onSuccess: () => {
          notifySuccess('Booking checked in', `Booking #${booking.id} checked in successfully.`)
        },
      })
    }
  }

  const handleCheckOut = (booking: Booking) => {
    if (!isAdmin) return

    if (confirm(`Checkout booking #${booking.id} and release the room?`)) {
      checkOutBooking.mutate(booking.id, {
        onSuccess: (updatedBooking) => {
          notifySuccess('Booking checked out', `Booking #${booking.id} checked out successfully.`)
          setSelectedBooking(updatedBooking)
          setDetailModalOpen(true)
        },
      })
    }
  }

  const handleStatusSubmit = (status: BookingStatus) => {
    if (!selectedBooking || !isAdmin) return

    updateBooking.mutate(
      { id: selectedBooking.id, data: { status } },
      {
        onSuccess: () => {
          setUpdateModalOpen(false)
          notifySuccess('Booking status updated', `Booking #${selectedBooking.id} status changed to ${status}.`)
          setSelectedBooking(null)
        },
      }
    )
  }

  const handleDetailsSubmit = (data: UpdateBookingDetailsRequest) => {
    if (!selectedBooking || !isAdmin) return

    updateBookingDetails.mutate(
      { id: selectedBooking.id, data },
      {
        onSuccess: (updatedBooking) => {
          setSelectedBooking(updatedBooking)
          setEditDetailsModalOpen(false)
          notifySuccess('Booking updated', `Booking #${updatedBooking.id} details updated.`)
        },
      }
    )
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have permission to access booking management. The backend currently allows only ADMIN accounts to view and update this data.
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">Booking Management</h1>
          <p className="mt-1 font-medium text-slate-500">Track, confirm, and operate guest bookings with commercial details included.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-2 shadow-sm sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System ready</span>
          </div>
          <Button onClick={() => setCreateModalOpen(true)} className="rounded-2xl bg-primary-600 px-8 py-6 shadow-xl shadow-primary-200 hover:bg-primary-500">
            <span className="material-symbols-outlined mr-2">add_circle</span>
            New Booking
          </Button>
        </div>
      </div>

      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}

      <Card className="overflow-visible border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="Booking List"
          subtitle={`${bookings.length} booking(s) in the current result`}
          icon="book_online"
          action={
            <div className="flex items-center gap-3">
              <div className="group flex w-64 items-center rounded-xl border border-slate-100 bg-slate-50 px-3 p-1 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100">
                <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
                <input
                  type="text"
                  placeholder="Search booking, guest, room..."
                  className="w-full border-none bg-transparent px-2 py-1.5 text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </div>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl p-0 hover:bg-slate-50">
                <span className="material-symbols-outlined">filter_list</span>
              </Button>
            </div>
          }
        />
        <CardContent noPadding>
          <div className="min-h-[400px]">
            <BookingTable
              bookings={bookings}
              loading={isLoading}
              onViewDetails={handleViewDetails}
              onEditDetails={handleEditDetails}
              onUpdateStatus={handleUpdateStatus}
              onCancel={handleCancel}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
            />
          </div>
        </CardContent>
      </Card>

      <CreateBookingModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        loading={createBooking.isPending}
        searchEnabled={isAdmin}
      />

      <BookingDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedBooking(null)
          clearOpenBookingParam()
        }}
        booking={selectedBooking}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
        lifecycleLoading={checkInBooking.isPending || checkOutBooking.isPending}
      />

      <UpdateStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false)
          setSelectedBooking(null)
        }}
        onSubmit={handleStatusSubmit}
        booking={selectedBooking}
        loading={updateBooking.isPending}
      />

      <EditBookingDetailsModal
        isOpen={isEditDetailsModalOpen}
        onClose={() => {
          setEditDetailsModalOpen(false)
          setSelectedBooking(null)
        }}
        booking={selectedBooking}
        onSubmit={handleDetailsSubmit}
        loading={updateBookingDetails.isPending}
      />
    </div>
  )
}
