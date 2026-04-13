import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { clientsApi, type ClientsSearchParams } from '../../../api/clients'
import type { ClientDetail, ClientSummary, CreateClientRequest, UpdateClientRequest } from '../../../types'

export function useClients(filters?: ClientsSearchParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['clients', filters ?? null],
    queryFn: (): Promise<ClientSummary[]> => clientsApi.getAll(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useClient(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: (): Promise<ClientDetail> => clientsApi.getById(id),
    enabled: (options?.enabled ?? true) && !!id,
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateClientRequest) => clientsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateClientRequest }) => clientsApi.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['clients', variables.id] })
    },
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => clientsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })
}
