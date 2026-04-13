import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import { useAuth } from '../../auth/useAuth'
import { useBillDetail } from '../hooks/useBillLedger'

export default function BillDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'
  const billId = Number(id)

  const { data: billDetail, isLoading, error } = useBillDetail(billId, { enabled: isAdmin && Number.isFinite(billId) })

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have permission to access bill details.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (!billDetail) {
    return (
      <div className="space-y-4">
        <Button variant="secondary" onClick={() => navigate('/billing')}>
          Back to Billing
        </Button>
        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {(error instanceof Error && error.message) || 'Bill not found.'}
        </div>
      </div>
    )
  }

  const { bill, processedBy, summary } = billDetail

  return (
    <div className="animate-in fade-in slide-in-from-top-2 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Button variant="secondary" onClick={() => navigate('/billing')}>
            Back to Billing
          </Button>
          <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-slate-900">Bill #{bill.billId}</h1>
          <p className="mt-1 font-medium text-slate-500">Payment record, booking charge breakdown, and processed-by details.</p>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/bookings?keyword=${bill.bookingId}&open=${bill.bookingId}`}
            className="inline-flex items-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200"
          >
            Review Booking
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Payment Record" subtitle="Stored bill header." icon="payments" />
          <CardContent className="space-y-4">
            <DetailField label="Payment Amount" value={`$${bill.paymentAmount.toLocaleString()}`} />
            <DetailField label="Payment Type" value={bill.paymentType} />
            <DetailField label="Payment Date" value={bill.paymentDate} />
            <DetailField label="Bill Note" value={bill.note || 'No bill note.'} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Booking Link" subtitle="Operational origin of this bill." icon="book_online" />
          <CardContent className="space-y-4">
            <DetailField label="Booking" value={`#${bill.bookingId}`} />
            <DetailField label="Guest" value={bill.guestName} />
            <DetailField label="Room" value={bill.roomNumber || '-'} />
            <DetailField label="Booking Status" value={bill.bookingStatus} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Processed By" subtitle="Internal billing operator record." icon="badge" />
          <CardContent className="space-y-4">
            <DetailField label="Staff" value={processedBy?.fullName || 'Unknown'} />
            <DetailField label="Username" value={processedBy ? `@${processedBy.username}` : 'Unknown'} />
            <DetailField label="Booking Discount" value={`$${summary.bookingDiscount.toLocaleString()}`} />
            <DetailField label="Booking Note" value={summary.bookingNote || 'No booking note.'} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Charge Summary" subtitle="Calculated from booking and used services." icon="receipt" />
          <CardContent className="space-y-4">
            <DetailField label="Check In" value={summary.checkIn} />
            <DetailField label="Check Out" value={summary.checkOut} />
            <DetailField label="Nights" value={String(summary.nights)} />
            <DetailField label="Room Charge" value={`$${summary.roomCharge.toLocaleString()}`} />
            <DetailField label="Service Charge" value={`$${summary.serviceCharge.toLocaleString()}`} />
            <DetailField label="Total Amount" value={`$${summary.totalAmount.toLocaleString()}`} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Navigation" subtitle="Move between bill and booking operations." icon="link" />
          <CardContent className="space-y-4">
            <Link to="/billing" className="block rounded-2xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Back to bill ledger
            </Link>
            <Link
              to={`/bookings?keyword=${bill.bookingId}&open=${bill.bookingId}`}
              className="block rounded-2xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Review booking #{bill.bookingId}
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader title="Used Service Lines" subtitle="The service portion included in this bill summary." icon="room_service" />
        <CardContent noPadding>
          <Table
            columns={[
              { key: 'serviceName', header: 'Service' },
              { key: 'unit', header: 'Unit' },
              { key: 'quantity', header: 'Quantity' },
              { key: 'unitPrice', header: 'Unit Price', render: (item) => `$${item.unitPrice.toLocaleString()}` },
              { key: 'discount', header: 'Discount', render: (item) => `$${item.discount.toLocaleString()}` },
              { key: 'totalAmount', header: 'Total', render: (item) => `$${item.totalAmount.toLocaleString()}` },
            ]}
            data={summary.services}
            keyExtractor={(item) => `${item.serviceId}-${item.serviceName}`}
            emptyMessage="No used service lines were attached to this bill."
          />
        </CardContent>
      </Card>
    </div>
  )
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}
