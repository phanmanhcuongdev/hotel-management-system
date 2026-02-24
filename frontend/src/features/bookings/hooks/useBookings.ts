import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '../../../api'
import type { CreateBookingRequest, UpdateBookingRequest } from '../../../types'

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => bookingsApi.getAll(),
  })
}

export function useBooking(id: number) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => bookingsApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBookingRequest) => bookingsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBookingRequest }) =>
      bookingsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => bookingsApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
