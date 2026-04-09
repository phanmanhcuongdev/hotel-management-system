import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '../../../api'
import { mockBookingsList } from '../../../data/mockData'
import type { Booking, CreateBookingRequest, UpdateBookingRequest } from '../../../types'

const USE_MOCK = false
const USE_DEV_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_FALLBACK !== 'false'

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async (): Promise<Booking[]> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockBookingsList
      }

      try {
        return await bookingsApi.getAll()
      } catch (error) {
        if (!USE_DEV_FALLBACK) {
          throw error
        }

        console.warn('Bookings API unavailable, using mock bookings for frontend flow.', error)
        return mockBookingsList
      }
    },
  })
}

export function useBooking(id: number) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: async (): Promise<Booking | undefined> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        return mockBookingsList.find((booking) => booking.id === id)
      }

      try {
        return await bookingsApi.getById(id)
      } catch (error) {
        if (!USE_DEV_FALLBACK) {
          throw error
        }

        console.warn(`Booking API unavailable for booking #${id}, using mock booking.`, error)
        return mockBookingsList.find((booking) => booking.id === id)
      }
    },
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateBookingRequest) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return { id: Date.now(), ...data, room: null, status: 'PENDING' } as unknown as Booking
      }

      return bookingsApi.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateBookingRequest }) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const booking = mockBookingsList.find((item) => item.id === id)
        return { ...booking, ...data } as Booking
      }

      return bookingsApi.update(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const booking = mockBookingsList.find((item) => item.id === id)
        return { ...booking, status: 'CANCELLED' } as Booking
      }

      return bookingsApi.cancel(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
