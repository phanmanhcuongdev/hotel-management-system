import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { bookingsApi, type BookingsSearchParams } from '../../../api/bookings'
import type { Booking, CreateBookingRequest, UpdateBookingDetailsRequest, UpdateBookingRequest } from '../../../types'

export function useBookings(filters?: BookingsSearchParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['bookings', filters ?? null],
    queryFn: (): Promise<Booking[]> => bookingsApi.getAll(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useBooking(id: number) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: (): Promise<Booking> => bookingsApi.getById(id),
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

export function useCheckInBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => bookingsApi.checkIn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useCheckOutBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => bookingsApi.checkOut(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBookingRequest }) => bookingsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateBookingDetails() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBookingDetailsRequest }) => bookingsApi.updateDetails(id, data),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['bills', 'booking', booking.id] })
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
