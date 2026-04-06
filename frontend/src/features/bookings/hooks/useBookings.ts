import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockBookingsList } from '../../../data/mockData'
import type { Booking, CreateBookingRequest, UpdateBookingRequest } from '../../../types'

// Use mock data for demo - replace with API calls in production
const USE_MOCK = false
const USE_DEV_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_FALLBACK !== 'false'

async function readJsonSafely(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('json')) {
    return null
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

async function loadBookingsFromApi() {
  const response = await fetch('/api/bookings')
  const payload = await readJsonSafely(response)

  if (!response.ok || !Array.isArray(payload)) {
    if (!USE_DEV_FALLBACK) {
      throw new Error('Khong tai duoc danh sach bookings tu API.')
    }

    console.warn('Bookings API unavailable, using mock bookings for frontend flow.')
    return mockBookingsList
  }

  return payload.filter(isBookingLike) as Booking[]
}

function isBookingLike(value: unknown): value is Booking {
  if (!value || typeof value !== 'object') {
    return false
  }

  const booking = value as Partial<Booking>

  return (
    typeof booking.id === 'number' &&
    typeof booking.guestName === 'string' &&
    typeof booking.checkIn === 'string' &&
    typeof booking.checkOut === 'string' &&
    typeof booking.status === 'string'
  )
}

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async (): Promise<Booking[]> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockBookingsList
      }

      return loadBookingsFromApi()
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
      const payload = await readJsonSafely(response)

      if (!response.ok || !payload || Array.isArray(payload)) {
        if (!USE_DEV_FALLBACK) {
          throw new Error(`Khong tai duoc booking #${id} tu API.`)
        }

        return mockBookingsList.find((booking) => booking.id === id)
      }

      return payload as Booking
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
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
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
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
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
