import { useMemo, useState } from 'react'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import { useRooms } from '../../rooms/hooks/useRooms'
import { useAuth } from '../../auth/useAuth'
import { useOccupancyReport, useReportOverview, useRevenueReport } from '../hooks/useReports'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function toInputDate(value: Date) {
  return value.toISOString().slice(0, 10)
}

function createDefaultRange() {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 29)

  return {
    startDate: toInputDate(startDate),
    endDate: toInputDate(endDate),
  }
}

export default function ReportsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'
  const defaultRange = useMemo(() => createDefaultRange(), [])

  const [startDate, setStartDate] = useState(defaultRange.startDate)
  const [endDate, setEndDate] = useState(defaultRange.endDate)
  const [roomIdInput, setRoomIdInput] = useState('')
  const [submittedFilters, setSubmittedFilters] = useState<{ startDate: string; endDate: string; roomId?: number }>({
    startDate: defaultRange.startDate,
    endDate: defaultRange.endDate,
  })

  const { data: rooms = [] } = useRooms(undefined, { enabled: isAdmin })
  const overviewQuery = useReportOverview(submittedFilters, { enabled: isAdmin })
  const revenueQuery = useRevenueReport(submittedFilters, { enabled: isAdmin })
  const occupancyQuery = useOccupancyReport(submittedFilters, { enabled: isAdmin })

  const pageError =
    (overviewQuery.error instanceof Error && overviewQuery.error.message) ||
    (revenueQuery.error instanceof Error && revenueQuery.error.message) ||
    (occupancyQuery.error instanceof Error && occupancyQuery.error.message) ||
    null

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have access to reports.
      </div>
    )
  }

  const overview = overviewQuery.data
  const revenue = revenueQuery.data
  const occupancy = occupancyQuery.data

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Reports</h1>
          <p className="mt-1 font-medium text-slate-500">Read-only operational reporting based on booking and billing data.</p>
        </div>

        <div className="grid gap-3 rounded-[2rem] border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Start</label>
            <input type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">End</label>
            <input type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Room</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" value={roomIdInput} onChange={(event) => setRoomIdInput(event.target.value)}>
              <option value="">All rooms</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              className="w-full rounded-xl"
              onClick={() => {
                setSubmittedFilters({
                  startDate,
                  endDate,
                  roomId: roomIdInput ? Number(roomIdInput) : undefined,
                })
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {pageError && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageError}</div>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
        <Card className="border-none shadow-xl shadow-slate-200/50">
          <CardContent className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Total Revenue</p>
            <p className="text-2xl font-black text-slate-900">{formatCurrency(overview?.totalRevenue ?? 0)}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-slate-200/50">
          <CardContent className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Bills</p>
            <p className="text-2xl font-black text-slate-900">{overview?.totalBills ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-slate-200/50">
          <CardContent className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Avg Bill</p>
            <p className="text-2xl font-black text-slate-900">{formatCurrency(overview?.averageBillAmount ?? 0)}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-slate-200/50">
          <CardContent className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Occupancy</p>
            <p className="text-2xl font-black text-slate-900">{overview?.occupancyRate?.toFixed(2) ?? '0.00'}%</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-slate-200/50">
          <CardContent className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Top Room</p>
            <p className="text-2xl font-black text-slate-900">{overview?.topRevenueRoom?.roomNumber ?? '-'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader
            title="Revenue By Day"
            subtitle={revenue?.calculatedFromBills ? 'Based on recorded bills within the selected payment-date range.' : 'No data available for the selected range.'}
            icon="payments"
          />
          <CardContent noPadding>
            <Table
              columns={[
                { key: 'date', header: 'Date' },
                { key: 'billCount', header: 'Bills' },
                { key: 'revenue', header: 'Revenue', render: (item) => formatCurrency(item.revenue) },
              ]}
              data={revenue?.dailyRevenue ?? []}
              keyExtractor={(item) => item.date}
              loading={revenueQuery.isLoading}
              emptyMessage="No daily revenue data is available for the selected range."
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Revenue By Room" subtitle="Based on recorded bills linked to each booked room." icon="meeting_room" />
          <CardContent noPadding>
            <Table
              columns={[
                { key: 'roomNumber', header: 'Room' },
                { key: 'billCount', header: 'Bills' },
                { key: 'revenue', header: 'Revenue', render: (item) => formatCurrency(item.revenue) },
              ]}
              data={revenue?.revenueByRoom ?? []}
              keyExtractor={(item) => item.roomId}
              loading={revenueQuery.isLoading}
              emptyMessage="No room revenue data is available for the selected range."
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="Occupancy By Day"
          subtitle={
            occupancy?.approximateFromScheduledStays
              ? 'Based on scheduled stay dates and room assignments. Maintenance rooms are excluded from occupancy totals.'
              : 'Based on recorded occupancy data.'
          }
          icon="hotel"
        />
        <CardContent noPadding>
          <Table
            columns={[
              { key: 'date', header: 'Date' },
              { key: 'occupiedRooms', header: 'Occupied' },
              { key: 'availableRooms', header: 'Vacant' },
              { key: 'occupancyRate', header: 'Occupancy %', render: (item) => `${item.occupancyRate.toFixed(2)}%` },
              { key: 'vacancyRate', header: 'Vacancy %', render: (item) => `${item.vacancyRate.toFixed(2)}%` },
            ]}
            data={occupancy?.dailyOccupancy ?? []}
            keyExtractor={(item) => item.date}
            loading={occupancyQuery.isLoading}
            emptyMessage="No occupancy data is available for the selected range."
          />
        </CardContent>
      </Card>
    </div>
  )
}
