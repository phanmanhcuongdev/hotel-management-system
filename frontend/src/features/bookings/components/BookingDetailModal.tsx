import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, Input, Select } from '../../../components/ui'
import { BookingStatusBadge } from './BookingStatusBadge'
import type { Booking, PaymentType } from '../../../types'
import { useBookingBill, useCreateBookingBill } from '../hooks/useBills'
import { useAddBookingUsedService, useBookingUsedServices, useServices } from '../hooks/useServices'

interface BookingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
  onCheckIn?: (booking: Booking) => void
  onCheckOut?: (booking: Booking) => void
  lifecycleLoading?: boolean
}

export function BookingDetailModal({ isOpen, onClose, booking, onCheckIn, onCheckOut, lifecycleLoading }: BookingDetailModalProps) {
  if (!booking) return null

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Booking #${booking.id}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="mt-1">
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Room</p>
            <p className="mt-1 font-medium">{booking.room?.roomNumber ?? '-'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Check-in</p>
            <p className="mt-1 font-medium">{formatDate(booking.checkIn)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Check-out</p>
            <p className="mt-1 font-medium">{formatDate(booking.checkOut)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="mt-1 font-medium">{calculateNights()} night(s)</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Guest</p>
            <p className="mt-1 font-medium">{booking.guestName}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Stay Progress</p>
          <p className="mt-1 font-medium">{booking.checkedIn ? 'Guest is currently checked in' : 'Guest has not checked in yet'}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
            <p className="text-sm font-semibold text-slate-900">Commercial Details</p>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Booking Discount</p>
                <p className="mt-1 font-medium text-slate-900">${booking.discount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-500">Booking Note</p>
                <p className="mt-1 text-slate-700">{booking.note?.trim() ? booking.note : 'No internal booking note.'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
            <p className="text-sm font-semibold text-slate-900">Staff Attribution</p>
            {booking.bookedBy ? (
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="text-slate-500">Booked By</p>
                  <p className="mt-1 font-medium text-slate-900">{booking.bookedBy.fullName}</p>
                </div>
                <div>
                  <p className="text-slate-500">Username</p>
                  <p className="mt-1 text-slate-700">@{booking.bookedBy.username}</p>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">No booking owner is recorded for this booking.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-900">Client Profile</p>
          {booking.clientId ? (
            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-600">This booking is linked to client profile #{booking.clientId}.</p>
              <Link to={`/clients/${booking.clientId}`} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                Open Client Profile
              </Link>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No client profile is linked to this booking yet.</p>
          )}
        </div>

        <BookingUsedServicesSection booking={booking} isOpen={isOpen} />
        <BookingBillSection booking={booking} isOpen={isOpen} />

        <div className="flex justify-end border-t pt-4">
          {booking.status === 'CONFIRMED' && !booking.checkedIn && onCheckIn && (
            <Button className="mr-3" loading={lifecycleLoading} onClick={() => onCheckIn(booking)}>
              Check-in
            </Button>
          )}
          {booking.status === 'CONFIRMED' && booking.checkedIn && onCheckOut && (
            <Button className="mr-3" loading={lifecycleLoading} onClick={() => onCheckOut(booking)}>
              Checkout
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function BookingUsedServicesSection({ booking, isOpen }: { booking: Booking; isOpen: boolean }) {
  const [serviceId, setServiceId] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [discount, setDiscount] = useState('0')
  const { data: services = [], isLoading: servicesLoading, error: servicesError } = useServices({ enabled: isOpen })
  const { data: usedServices = [], isLoading: usedServicesLoading, error: usedServicesError } = useBookingUsedServices(booking.id, { enabled: isOpen })
  const addUsedService = useAddBookingUsedService()

  useEffect(() => {
    setServiceId('')
    setQuantity('1')
    setDiscount('0')
  }, [booking.id])

  const serviceOptions = [
    { value: '', label: services.length > 0 ? 'Select service' : 'No services available' },
    ...services.map((service) => ({
      value: String(service.id),
      label: `${service.name} (${service.unit}) - $${service.price.toLocaleString()}`,
    })),
  ]

  const handleAddUsedService = () => {
    if (!serviceId) {
      return
    }

    addUsedService.mutate({
      bookingId: booking.id,
      data: {
        serviceId: Number(serviceId),
        quantity: Number(quantity),
        discount: Number(discount) || 0,
      },
    })
  }

  return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Used Services</p>
          <p className="text-xs text-slate-500">Services are attached to the current stay via booked room context.</p>
        </div>
        <Link to="/services" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
          Manage Catalog
        </Link>
      </div>

      {(servicesError instanceof Error || usedServicesError instanceof Error) && (
        <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
          {(servicesError instanceof Error && servicesError.message) || (usedServicesError instanceof Error && usedServicesError.message)}
        </p>
      )}

      {addUsedService.error instanceof Error && (
        <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{addUsedService.error.message}</p>
      )}

      {(servicesLoading || usedServicesLoading) && <p className="text-sm text-slate-500">Loading services...</p>}

      {usedServices.length > 0 ? (
        <div className="space-y-2">
          {usedServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-slate-900">{service.serviceName}</p>
                <p className="text-slate-500">
                  {service.quantity} {service.unit} x ${service.unitPrice.toLocaleString()}
                  {service.discount > 0 ? `, discount $${service.discount.toLocaleString()}` : ''}
                </p>
              </div>
              <span className="font-semibold text-slate-900">${service.totalAmount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No used services recorded for this booking yet.</p>
      )}

      {booking.status === 'CONFIRMED' && booking.checkedIn && (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-4">
          <div className="grid gap-3 md:grid-cols-3">
            <Select id="serviceId" label="Service" options={serviceOptions} value={serviceId} onChange={(event) => setServiceId(event.target.value)} />
            <Input id="quantity" label="Quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            <Input id="discount" label="Discount" type="number" min="0" step="0.01" value={discount} onChange={(event) => setDiscount(event.target.value)} />
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleAddUsedService} loading={addUsedService.isPending} disabled={!serviceId}>
              Add Service
            </Button>
          </div>
        </div>
      )}

      {booking.status !== 'CONFIRMED' || !booking.checkedIn ? (
        <p className="mt-4 text-sm text-slate-500">Used services can only be added while the guest is checked in.</p>
      ) : null}
    </div>
  )
}

function BookingBillSection({ booking, isOpen }: { booking: Booking; isOpen: boolean }) {
  const [paymentType, setPaymentType] = useState<PaymentType>('CASH')
  const [billNote, setBillNote] = useState('')
  const { data: billSummary, isLoading: isBillLoading, error: billError } = useBookingBill(booking.id, {
    enabled: isOpen,
  })
  const createBill = useCreateBookingBill()

  useEffect(() => {
    setPaymentType('CASH')
    setBillNote('')
  }, [booking.id])

  const paymentOptions = [
    { value: 'CASH', label: 'Cash' },
    { value: 'CARD', label: 'Card' },
    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
  ]

  const handleCreateBill = () => {
    createBill.mutate({
      bookingId: booking.id,
      data: {
        paymentType,
        note: billNote.trim() || undefined,
      },
    })
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Bill Summary</p>
          <p className="text-xs text-slate-500">Internal bill only. No external payment gateway in this step.</p>
        </div>
      </div>

      {isBillLoading && <p className="text-sm text-slate-500">Loading bill summary...</p>}

      {billError instanceof Error && <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{billError.message}</p>}

      {createBill.error instanceof Error && (
        <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{createBill.error.message}</p>
      )}

      {billSummary && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white px-3 py-3">
              <p className="text-slate-500">Room Charge</p>
              <p className="mt-1 font-semibold text-slate-900">${billSummary.roomCharge.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-white px-3 py-3">
              <p className="text-slate-500">Service Charge</p>
              <p className="mt-1 font-semibold text-slate-900">${billSummary.serviceCharge.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div className="rounded-xl bg-white px-3 py-3">
              <p className="text-slate-500">Booking Discount Applied</p>
              <p className="mt-1 font-semibold text-slate-900">${billSummary.bookingDiscount.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-white px-3 py-3">
              <p className="text-slate-500">Booking Note</p>
              <p className="mt-1 text-slate-700">{billSummary.bookingNote?.trim() ? billSummary.bookingNote : 'No booking note.'}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Amount</span>
              <span className="text-lg font-bold text-slate-900">${billSummary.totalAmount.toLocaleString()}</span>
            </div>
            {billSummary.billCreated && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Payment Type</p>
                  <p className="mt-1 font-medium text-slate-900">{billSummary.paymentType ?? 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-slate-500">Payment Date</p>
                  <p className="mt-1 font-medium text-slate-900">{billSummary.paymentDate ?? '-'}</p>
                </div>
              </div>
            )}
            {billSummary.billCreated && billSummary.billId ? (
              <div className="mt-3">
                <Link to={`/billing/${billSummary.billId}`} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                  Open Bill Record
                </Link>
              </div>
            ) : null}
          </div>

          {billSummary.services.length > 0 && (
            <div className="rounded-xl bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">Used Services</p>
              <div className="mt-3 space-y-2">
                {billSummary.services.map((service) => (
                  <div key={`${service.serviceId}-${service.serviceName}`} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">
                      {service.serviceName} x{service.quantity} {service.unit}
                    </span>
                    <span className="font-medium text-slate-900">${service.totalAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!billSummary.billCreated && booking.status !== 'COMPLETED' && <p className="text-sm text-slate-500">Bill can be created after checkout completes.</p>}

          {!billSummary.billCreated && booking.status === 'COMPLETED' && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-4">
              <p className="mb-3 text-sm text-slate-500">
                Final bill amount already includes the booking discount shown above and any used-service discounts.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Select
                  id="paymentType"
                  label="Payment Type"
                  options={paymentOptions}
                  value={paymentType}
                  onChange={(event) => setPaymentType(event.target.value as PaymentType)}
                />
                <Input
                  id="billNote"
                  label="Note (optional)"
                  value={billNote}
                  onChange={(event) => setBillNote(event.target.value)}
                  placeholder="Internal payment note"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleCreateBill} loading={createBill.isPending}>
                  Create Bill
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
