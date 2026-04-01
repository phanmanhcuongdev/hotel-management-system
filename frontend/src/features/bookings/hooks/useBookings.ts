import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Booking, CreateBookingRequest, UpdateBookingRequest } from '../../../types'

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

function isBookingLike(value: unknown): value is Booking {
  if (!value || typeof value !== 'object') {
    return false
  }

  const booking = value as Partial<Booking>

  return typeof booking.id === 'number' && typeof booking.checkIn === 'string' && typeof booking.checkOut === 'string' && typeof booking.status === 'string'
}

async function loadBookingsFromApi(): Promise<Booking[]> {
  const response = await fetch('/api/bookings')
  const payload = await readJsonSafely(response)

  if (!response.ok || !Array.isArray(payload)) {
    throw new Error('Khong tai duoc danh sach bookings tu API.')
  }

  return payload.filter(isBookingLike) as Booking[]
}

async function loadBookingFromApi(id: number): Promise<Booking | undefined> {
  const response = await fetch(`/api/bookings/${id}`)
  const payload = await readJsonSafely(response)

  if (!response.ok || !payload || Array.isArray(payload)) {
    throw new Error(`Khong tai duoc booking #${id} tu API.`)
  }

  return payload as Booking
}

async function createBookingApi(data: CreateBookingRequest): Promise<Booking> {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to create booking')
  return response.json()
}

async function updateBookingApi({ id, data }: { id: number; data: UpdateBookingRequest }): Promise<Booking> {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update booking')
  return response.json()
}

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: loadBookingsFromApi,
  })
}

export function useBooking(id: number) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => loadBookingFromApi(id),
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      updateBookingApi({ id, data: { status: 'CANCELLED' } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
