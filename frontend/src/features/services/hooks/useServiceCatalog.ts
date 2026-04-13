import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { servicesApi } from '../../../api'
import type { CreateServiceRequest, ServiceCatalogItem } from '../../../types'

export function useServiceCatalog(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['services'],
    queryFn: (): Promise<ServiceCatalogItem[]> => servicesApi.getAll(),
    enabled: options?.enabled ?? true,
  })
}

export function useCreateService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateServiceRequest) => servicesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

export function useUpdateService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateServiceRequest }) => servicesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

export function useDeleteService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}
