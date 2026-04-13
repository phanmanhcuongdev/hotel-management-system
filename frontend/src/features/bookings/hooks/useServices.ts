import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { servicesApi } from '../../../api'
import type { AddUsedServiceRequest, ServiceCatalogItem, UsedServiceItem } from '../../../types'

export function useServices(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['services'],
    queryFn: (): Promise<ServiceCatalogItem[]> => servicesApi.getAll(),
    enabled: options?.enabled ?? true,
  })
}

export function useBookingUsedServices(bookingId?: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['used-services', bookingId ?? null],
    queryFn: (): Promise<UsedServiceItem[]> => servicesApi.getUsedByBookingId(bookingId as number),
    enabled: (options?.enabled ?? true) && !!bookingId,
  })
}

export function useAddBookingUsedService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ bookingId, data }: { bookingId: number; data: AddUsedServiceRequest }) => servicesApi.addUsedToBooking(bookingId, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['used-services', variables.bookingId] })
      queryClient.invalidateQueries({ queryKey: ['bills', 'booking', variables.bookingId] })
    },
  })
}
