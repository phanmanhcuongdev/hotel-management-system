import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockBookingsList } from '../../../data/mockData'
import type { Booking, CreateBookingRequest, UpdateBookingRequest } from '../../../types'

// Use mock data for demo - replace with API calls in production
const USE_MOCK = false

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async (): Promise<Booking[]> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockBookingsList
      }
      const response = await fetch('/api/bookings')
      return response.json()
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
      const response = await fetch(`/api/bookings/${id}`)
      return response.json()
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
        console.log('Mock create booking:', data)
        return { id: Date.now(), ...data, status: 'PENDING' }
      }
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
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
        console.log('Mock update booking:', id, data)
        const booking = mockBookingsList.find((b) => b.id === id)
        return { ...booking, ...data }
      }
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
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
        console.log('Mock cancel booking:', id)
        const booking = mockBookingsList.find((b) => b.id === id)
        return { ...booking, status: 'CANCELLED' }
      }
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' }),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
