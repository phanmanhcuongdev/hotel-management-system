import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import type { ClientSummary, UpdateClientRequest } from '../../../types'
import { useAuth } from '../../auth/useAuth'
import { ClientFormModal } from '../components/ClientFormModal'
import { useClient, useDeleteClient, useUpdateClient } from '../hooks/useClients'

export default function ClientDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'
  const clientId = Number(id)

  const [isEditOpen, setEditOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const { data: client, isLoading, error } = useClient(clientId, { enabled: isAdmin && Number.isFinite(clientId) })
  const updateClient = useUpdateClient()
  const deleteClient = useDeleteClient()

  const pageErrorMessage =
    (error instanceof Error && error.message) ||
    (updateClient.error instanceof Error && updateClient.error.message) ||
    (deleteClient.error instanceof Error && deleteClient.error.message) ||
    null

  const handleUpdate = (data: UpdateClientRequest) => {
    if (!client) {
      return
    }

    updateClient.mutate(
      { id: client.id, data },
      {
        onSuccess: () => {
          setEditOpen(false)
          setFeedbackMessage('Client profile was updated.')
        },
      },
    )
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have access to the client detail area.
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

  if (!client) {
    return (
      <div className="space-y-4">
        <Button variant="secondary" onClick={() => navigate('/clients')}>
          Back to Clients
        </Button>
        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {pageErrorMessage || 'Client not found.'}
        </div>
      </div>
    )
  }

  const editableClient: ClientSummary = {
    id: client.id,
    idCardNumber: client.idCardNumber,
    fullName: client.fullName,
    address: client.address,
    email: client.email,
    phoneNumber: client.phoneNumber,
    description: client.description,
    needsReview: client.needsReview,
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Button variant="secondary" onClick={() => navigate('/clients')}>
            Back to Clients
          </Button>
          <h1 className="mt-4 text-3xl font-black italic uppercase tracking-tight text-slate-900">{client.fullName}</h1>
          <p className="mt-1 font-medium text-slate-500">Client profile and booking history for the current property.</p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setEditOpen(true)}>
            Edit Client
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirm(`Delete client ${client.fullName}? This is only allowed when the client has no booking history.`)) {
                deleteClient.mutate(client.id, {
                  onSuccess: () => {
                    navigate('/clients', {
                      replace: true,
                    })
                  },
                })
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}
      {feedbackMessage && <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{feedbackMessage}</div>}

      {client.needsReview && (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          This profile was auto-created from a booking flow and still needs review. Replace placeholder identity or address data before relying on it operationally.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Client Profile" subtitle="Trusted guest details used across booking operations." icon="person" />
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileField label="Full Name" value={client.fullName} />
              <ProfileField label="ID Card Number" value={formatClientIdentity(client)} />
              <ProfileField label="Phone Number" value={client.phoneNumber || 'Not provided'} />
              <ProfileField label="Email" value={client.email || 'Not provided'} />
              <ProfileField label="Address" value={formatClientAddress(client)} />
              <ProfileField label="Profile Status" value={client.needsReview ? 'Needs review' : 'Ready'} />
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Description</p>
              <p className="mt-2">{client.description || 'No description provided.'}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="History Snapshot" subtitle="Quick visibility into linked stays." icon="history" />
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Linked bookings</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{client.bookingHistory.length}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Latest stay</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {client.bookingHistory[0] ? `${client.bookingHistory[0].checkIn} to ${client.bookingHistory[0].checkOut}` : 'No stay history yet'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader title="Booking History" subtitle="Bookings currently linked to this client profile." icon="book_online" />
        <CardContent noPadding>
          <Table
            columns={[
              {
                key: 'bookingId',
                header: 'Booking',
                render: (item) => <span className="font-medium">#{item.bookingId}</span>,
              },
              {
                key: 'roomNumber',
                header: 'Room',
                render: (item) => item.roomNumber || 'Not assigned',
              },
              {
                key: 'checkIn',
                header: 'Check In',
              },
              {
                key: 'checkOut',
                header: 'Check Out',
              },
              {
                key: 'status',
                header: 'Status',
                render: (item) => (
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.status}</span>
                ),
              },
              {
                key: 'actions',
                header: 'Actions',
                render: () => (
                  <Link to="/bookings" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                    Open bookings
                  </Link>
                ),
              },
            ]}
            data={client.bookingHistory}
            keyExtractor={(item) => item.bookingId}
            emptyMessage="This client does not have linked booking history yet."
          />
        </CardContent>
      </Card>

      <ClientFormModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        onCreate={() => undefined}
        onUpdate={handleUpdate}
        loading={updateClient.isPending}
        client={editableClient}
      />
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function formatClientIdentity(client: { needsReview: boolean; idCardNumber: string }) {
  if (client.needsReview && client.idCardNumber.startsWith('AUTO-PHONE-')) {
    return 'Identity pending review'
  }

  return client.idCardNumber
}

function formatClientAddress(client: { needsReview: boolean; address: string }) {
  if (client.needsReview && client.address.trim().toUpperCase() === 'UNKNOWN') {
    return 'Address pending review'
  }

  return client.address
}
