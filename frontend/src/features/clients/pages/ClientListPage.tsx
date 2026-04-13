import { useDeferredValue, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import type { ClientSummary, CreateClientRequest, UpdateClientRequest } from '../../../types'
import { useAuth } from '../../auth/useAuth'
import { notifySuccess } from '../../notifications/notificationStore'
import { ClientFormModal } from '../components/ClientFormModal'
import { useClients, useCreateClient, useDeleteClient, useUpdateClient } from '../hooks/useClients'

type ReviewFilter = 'all' | 'needs-review' | 'ready'

export default function ClientListPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'

  const [searchValue, setSearchValue] = useState('')
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all')
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<ClientSummary | null>(null)
  const deferredSearchValue = useDeferredValue(searchValue.trim())

  const { data: clients = [], isLoading, error } = useClients(
    {
      keyword: deferredSearchValue || undefined,
      needsReview: reviewFilter === 'all' ? undefined : reviewFilter === 'needs-review',
    },
    { enabled: isAdmin },
  )
  const createClient = useCreateClient()
  const updateClient = useUpdateClient()
  const deleteClient = useDeleteClient()

  const pageErrorMessage =
    (error instanceof Error && error.message) ||
    (createClient.error instanceof Error && createClient.error.message) ||
    (updateClient.error instanceof Error && updateClient.error.message) ||
    (deleteClient.error instanceof Error && deleteClient.error.message) ||
    null

  const columns = useMemo(
    () => [
      {
        key: 'fullName',
        header: 'Client',
        render: (item: ClientSummary) => (
          <div>
            <button className="font-semibold text-primary-700 hover:text-primary-800" onClick={() => navigate(`/clients/${item.id}`)}>
              {item.fullName}
            </button>
            <p className="text-xs text-slate-500">{formatClientIdentity(item)}</p>
          </div>
        ),
      },
      {
        key: 'phoneNumber',
        header: 'Phone',
        render: (item: ClientSummary) => item.phoneNumber || 'Not provided',
      },
      {
        key: 'email',
        header: 'Email',
        render: (item: ClientSummary) => item.email || 'Not provided',
      },
      {
        key: 'address',
        header: 'Address',
        render: (item: ClientSummary) => formatClientAddress(item),
      },
      {
        key: 'needsReview',
        header: 'Profile Status',
        render: (item: ClientSummary) => (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              item.needsReview ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {item.needsReview ? 'Needs review' : 'Ready'}
          </span>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (item: ClientSummary) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/clients/${item.id}`)}>
              Details
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingClient(item)
                setModalOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (confirm(`Delete client ${item.fullName}? This is only allowed when the client has no booking history.`)) {
                  deleteClient.mutate(item.id, {
                    onSuccess: () => {
                      notifySuccess('Client deleted', `Client ${item.fullName} was deleted.`)
                    },
                  })
                }
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [deleteClient, navigate],
  )

  const handleCreate = (data: CreateClientRequest) => {
    createClient.mutate(data, {
      onSuccess: (createdClient) => {
        setModalOpen(false)
        setEditingClient(null)
        notifySuccess('Client created', `Client ${createdClient.fullName} was created.`)
      },
    })
  }

  const handleUpdate = (data: UpdateClientRequest) => {
    if (!editingClient) {
      return
    }

    updateClient.mutate(
      { id: editingClient.id, data },
      {
        onSuccess: (updatedClient) => {
          setModalOpen(false)
          setEditingClient(null)
          notifySuccess('Client updated', `Client ${updatedClient.fullName} was updated.`)
        },
      },
    )
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have access to the client management area.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Client Management</h1>
          <p className="mt-1 font-medium text-slate-500">Search, review, and maintain guest profiles linked to bookings.</p>
        </div>

        <Button
          onClick={() => {
            setEditingClient(null)
            setModalOpen(true)
          }}
          className="rounded-2xl bg-primary-600 px-8 py-6 shadow-xl shadow-primary-200 hover:bg-primary-500"
        >
          <span className="material-symbols-outlined mr-2">person_add</span>
          Create Client
        </Button>
      </div>

      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="Client Directory"
          subtitle={`Showing ${clients.length} client profiles`}
          icon="badge"
          action={
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="group flex w-72 items-center rounded-xl border border-slate-100 bg-slate-50 px-3 p-1 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100">
                <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
                <input
                  type="text"
                  placeholder="Search by name, ID card, phone, email..."
                  className="w-full border-none bg-transparent px-2 py-1.5 text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </div>
              <select
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={reviewFilter}
                onChange={(event) => setReviewFilter(event.target.value as ReviewFilter)}
              >
                <option value="all">All profiles</option>
                <option value="needs-review">Needs review</option>
                <option value="ready">Ready</option>
              </select>
            </div>
          }
        />
        <CardContent noPadding>
          <Table
            columns={columns}
            data={clients}
            keyExtractor={(item) => item.id}
            loading={isLoading}
            emptyMessage="No clients match the current filters."
          />
        </CardContent>
      </Card>

      <ClientFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingClient(null)
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        loading={createClient.isPending || updateClient.isPending}
        client={editingClient}
      />
    </div>
  )
}

function formatClientIdentity(client: ClientSummary) {
  if (client.needsReview && client.idCardNumber.startsWith('AUTO-PHONE-')) {
    return 'Identity pending review'
  }

  return client.idCardNumber
}

function formatClientAddress(client: ClientSummary) {
  if (client.needsReview && client.address.trim().toUpperCase() === 'UNKNOWN') {
    return 'Address pending review'
  }

  return client.address
}
