import { useDeferredValue, useMemo, useState } from 'react'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import type { CreateServiceRequest, ServiceCatalogItem } from '../../../types'
import { useAuth } from '../../auth/useAuth'
import { ServiceFormModal } from '../components/ServiceFormModal'
import { useCreateService, useDeleteService, useServiceCatalog, useUpdateService } from '../hooks/useServiceCatalog'

export default function ServiceCatalogPage() {
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'

  const [searchValue, setSearchValue] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<ServiceCatalogItem | null>(null)
  const deferredSearchValue = useDeferredValue(searchValue.trim().toLowerCase())

  const { data: services = [], isLoading, error } = useServiceCatalog({ enabled: isAdmin })
  const createService = useCreateService()
  const updateService = useUpdateService()
  const deleteService = useDeleteService()

  const pageErrorMessage =
    (error instanceof Error && error.message) ||
    (createService.error instanceof Error && createService.error.message) ||
    (updateService.error instanceof Error && updateService.error.message) ||
    (deleteService.error instanceof Error && deleteService.error.message) ||
    null

  const filteredServices = useMemo(() => {
    if (!deferredSearchValue) {
      return services
    }

    return services.filter((service) =>
      [service.name, service.unit, String(service.id)].some((value) => value.toLowerCase().includes(deferredSearchValue))
    )
  }, [deferredSearchValue, services])

  const columns = useMemo(
    () => [
      {
        key: 'name',
        header: 'Service',
        render: (item: ServiceCatalogItem) => (
          <div>
            <p className="font-semibold text-slate-900">{item.name}</p>
            <p className="text-xs text-slate-500">#{item.id}</p>
          </div>
        ),
      },
      { key: 'unit', header: 'Unit' },
      {
        key: 'price',
        header: 'Price',
        render: (item: ServiceCatalogItem) => `$${item.price.toLocaleString()}`,
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (item: ServiceCatalogItem) => (
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="rounded-lg"
              onClick={() => {
                setEditingService(item)
                setModalOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              type="button"
              size="sm"
              variant="danger"
              className="rounded-lg"
              onClick={() => {
                if (confirm(`Delete service "${item.name}"?`)) {
                  deleteService.mutate(item.id, {
                    onSuccess: () => {
                      setFeedbackMessage(`Service "${item.name}" deleted.`)
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
    [deleteService],
  )

  const handleCreate = (data: CreateServiceRequest) => {
    createService.mutate(data, {
      onSuccess: (created) => {
        setModalOpen(false)
        setEditingService(null)
        setFeedbackMessage(`Service "${created.name}" created.`)
      },
    })
  }

  const handleUpdate = (data: CreateServiceRequest) => {
    if (!editingService) {
      return
    }

    updateService.mutate(
      { id: editingService.id, data },
      {
        onSuccess: (updated) => {
          setModalOpen(false)
          setEditingService(null)
          setFeedbackMessage(`Service "${updated.name}" updated.`)
        },
      },
    )
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have permission to access service catalog management.
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">Service Catalog</h1>
          <p className="mt-1 font-medium text-slate-500">Manage the stay services that staff can add during an active guest stay.</p>
        </div>

        <Button
          onClick={() => {
            setEditingService(null)
            setModalOpen(true)
          }}
          className="rounded-2xl bg-primary-600 px-8 py-6 shadow-xl shadow-primary-200 hover:bg-primary-500"
        >
          <span className="material-symbols-outlined mr-2">room_service</span>
          New Service
        </Button>
      </div>

      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}
      {feedbackMessage && <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{feedbackMessage}</div>}

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="Service Catalog List"
          subtitle={`${filteredServices.length} service(s) in the current result`}
          icon="room_service"
          action={
            <div className="group flex w-64 items-center rounded-xl border border-slate-100 bg-slate-50 px-3 p-1 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100">
              <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
              <input
                type="text"
                placeholder="Search service, unit, id..."
                className="w-full border-none bg-transparent px-2 py-1.5 text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          }
        />
        <CardContent noPadding>
          <Table columns={columns} data={filteredServices} keyExtractor={(item) => item.id} loading={isLoading} emptyMessage="No services found." />
        </CardContent>
      </Card>

      <Card className="border border-slate-100 bg-slate-50 shadow-none">
        <CardContent className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900">Used-Service Integration</h2>
          <p className="text-sm text-slate-600">
            Services created here are immediately available in booking stay operations. Services already referenced by used-service rows cannot be deleted,
            which protects bill history and stay records.
          </p>
        </CardContent>
      </Card>

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingService(null)
        }}
        service={editingService}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        loading={createService.isPending || updateService.isPending}
      />
    </div>
  )
}
