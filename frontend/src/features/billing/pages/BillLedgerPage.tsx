import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import type { PaymentType } from '../../../types'
import { useAuth } from '../../auth/useAuth'
import { useBillLedger } from '../hooks/useBillLedger'

export default function BillLedgerPage() {
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'

  const [keyword, setKeyword] = useState('')
  const [bookingIdInput, setBookingIdInput] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [paymentDateFrom, setPaymentDateFrom] = useState('')
  const [paymentDateTo, setPaymentDateTo] = useState('')
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [submittedFilters, setSubmittedFilters] = useState<{
    keyword?: string
    bookingId?: number
    paymentType?: PaymentType
    paymentDateFrom?: string
    paymentDateTo?: string
  }>({})
  const deferredKeyword = useDeferredValue(keyword.trim())

  const { data: bills = [], isLoading, error } = useBillLedger(
    {
      keyword: submittedFilters.keyword,
      bookingId: submittedFilters.bookingId,
      paymentType: submittedFilters.paymentType,
      paymentDateFrom: submittedFilters.paymentDateFrom,
      paymentDateTo: submittedFilters.paymentDateTo,
    },
    { enabled: isAdmin },
  )

  const pageErrorMessage = (error instanceof Error && error.message) || null
  const activeFilterSummary = useMemo(() => {
    const summary: string[] = []

    if (submittedFilters.keyword) {
      summary.push(`Keyword: ${submittedFilters.keyword}`)
    }

    if (submittedFilters.bookingId) {
      summary.push(`Booking #${submittedFilters.bookingId}`)
    }

    if (submittedFilters.paymentType) {
      summary.push(`Payment type: ${formatPaymentType(submittedFilters.paymentType)}`)
    }

    if (submittedFilters.paymentDateFrom || submittedFilters.paymentDateTo) {
      summary.push(
        `Payment date: ${submittedFilters.paymentDateFrom || '...'} to ${submittedFilters.paymentDateTo || '...'}`
      )
    }

    return summary.length > 0 ? summary.join(' | ') : 'Showing all bills.'
  }, [submittedFilters])

  const handleApplyFilters = () => {
    const trimmedKeyword = deferredKeyword || undefined
    const parsedBookingId = bookingIdInput.trim() ? Number(bookingIdInput) : undefined

    if (bookingIdInput.trim()) {
      if (!Number.isInteger(parsedBookingId) || (parsedBookingId as number) <= 0) {
        setValidationMessage('Booking ID must be a positive whole number.')
        return
      }
    }

    if (paymentDateFrom && paymentDateTo && paymentDateFrom > paymentDateTo) {
      setValidationMessage('The payment date range is invalid. The "From" date must be on or before the "To" date.')
      return
    }

    setValidationMessage(null)
    setSubmittedFilters({
      keyword: trimmedKeyword,
      bookingId: parsedBookingId,
      paymentType: paymentType ? (paymentType as PaymentType) : undefined,
      paymentDateFrom: paymentDateFrom || undefined,
      paymentDateTo: paymentDateTo || undefined,
    })
  }

  const handleResetFilters = () => {
    setKeyword('')
    setBookingIdInput('')
    setPaymentType('')
    setPaymentDateFrom('')
    setPaymentDateTo('')
    setValidationMessage(null)
    setSubmittedFilters({})
  }

  const columns = useMemo(
    () => [
      {
        key: 'billId',
        header: 'Bill',
        render: (item: (typeof bills)[number]) => <span className="font-medium">#{item.billId}</span>,
      },
      {
        key: 'bookingId',
        header: 'Booking',
        render: (item: (typeof bills)[number]) => (
          <Link to={`/bookings?keyword=${item.bookingId}&open=${item.bookingId}`} className="font-medium text-primary-700 hover:text-primary-800">
            #{item.bookingId}
          </Link>
        ),
      },
      {
        key: 'guestName',
        header: 'Guest',
      },
      {
        key: 'roomNumber',
        header: 'Room',
        render: (item: (typeof bills)[number]) => item.roomNumber || '-',
      },
      {
        key: 'bookingStatus',
        header: 'Booking Status',
        render: (item: (typeof bills)[number]) => formatBookingStatus(item.bookingStatus),
      },
      {
        key: 'paymentType',
        header: 'Payment Type',
        render: (item: (typeof bills)[number]) => formatPaymentType(item.paymentType),
      },
      {
        key: 'paymentDate',
        header: 'Payment Date',
      },
      {
        key: 'paymentAmount',
        header: 'Amount',
        render: (item: (typeof bills)[number]) => `$${item.paymentAmount.toLocaleString()}`,
      },
      {
        key: 'note',
        header: 'Bill Note',
        render: (item: (typeof bills)[number]) => item.note?.trim() || 'No note',
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (item: (typeof bills)[number]) => (
          <div className="flex gap-3">
            <Link to={`/billing/${item.billId}`} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
              Open Bill
            </Link>
            <Link to={`/bookings?keyword=${item.bookingId}&open=${item.bookingId}`} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              Review Booking
            </Link>
          </div>
        ),
      },
    ],
    [],
  )

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have permission to access billing operations.
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">Billing Operations</h1>
          <p className="mt-1 font-medium text-slate-500">Review internal bill history across bookings, guests, rooms, and payment dates.</p>
        </div>

        <div className="grid gap-3 rounded-[2rem] border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-5">
          <div>
            <label htmlFor="billing-keyword" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Keyword</label>
            <input
              id="billing-keyword"
              type="text"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Bill, booking, guest, room..."
            />
          </div>
          <div>
            <label htmlFor="billing-booking-id" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Booking ID</label>
            <input
              id="billing-booking-id"
              type="number"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={bookingIdInput}
              onChange={(event) => setBookingIdInput(event.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <label htmlFor="billing-payment-type" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Payment Type</label>
            <select id="billing-payment-type" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" value={paymentType} onChange={(event) => setPaymentType(event.target.value)}>
              <option value="">All payment types</option>
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label htmlFor="billing-payment-from" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">From</label>
            <input id="billing-payment-from" type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" value={paymentDateFrom} onChange={(event) => setPaymentDateFrom(event.target.value)} />
          </div>
          <div>
            <label htmlFor="billing-payment-to" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">To</label>
            <input id="billing-payment-to" type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" value={paymentDateTo} onChange={(event) => setPaymentDateTo(event.target.value)} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">{activeFilterSummary}</p>
        <div className="flex gap-3">
          <Button variant="secondary" className="rounded-xl" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <Button className="rounded-xl" onClick={handleApplyFilters}>
          Apply Filters
          </Button>
        </div>
      </div>

      {validationMessage && <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm text-amber-700">{validationMessage}</div>}
      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="Bill Ledger"
          subtitle={`${bills.length} bill(s) in the current result`}
          icon="receipt_long"
        />
        <CardContent noPadding>
          <Table columns={columns} data={bills} keyExtractor={(item) => item.billId} loading={isLoading} emptyMessage="No bills found for the current filters." />
        </CardContent>
      </Card>
    </div>
  )
}

function formatPaymentType(value: PaymentType) {
  switch (value) {
    case 'BANK_TRANSFER':
      return 'Bank Transfer'
    case 'CARD':
      return 'Card'
    case 'CASH':
      return 'Cash'
    default:
      return value
  }
}

function formatBookingStatus(value: string) {
  return value
    .split('_')
    .map((segment) => segment.charAt(0) + segment.slice(1).toLowerCase())
    .join(' ')
}
