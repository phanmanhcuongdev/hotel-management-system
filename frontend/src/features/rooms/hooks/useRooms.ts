import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockRooms } from '../../../data/mockData'
import type { RoomStatus, Room, UpdateRoomRequest } from '../../../types'

const USE_MOCK = false
const USE_DEV_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_FALLBACK !== 'false'

async function fetchRoomsSafely(status?: RoomStatus): Promise<Room[]> {
  const response = await fetch(`/api/rooms${status ? `?status=${status}` : ''}`)

  if (response.status === 401 || response.status === 403) {
    if (!USE_DEV_FALLBACK) throw new Error('Unauthorized: cannot load rooms.')
    console.warn('Rooms API unavailable, using mock rooms for frontend flow.')
    return status ? mockRooms.filter((r) => r.status === status) : mockRooms
  }

  const data = await response.json()
  if (!Array.isArray(data)) {
    if (!USE_DEV_FALLBACK) throw new Error('Unexpected rooms response.')
    console.warn('Rooms API returned non-array, using mock rooms.')
    return status ? mockRooms.filter((r) => r.status === status) : mockRooms
  }

  return data as Room[]
}

export function useRooms(status?: RoomStatus) {
  return useQuery({
    queryKey: ['rooms', status],
    queryFn: async (): Promise<Room[]> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return status ? mockRooms.filter((room) => room.status === status) : mockRooms
      }
      return fetchRoomsSafely(status)
    },
  })
}

export function useRoom(id: number) {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: async (): Promise<Room | undefined> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        return mockRooms.find((room) => room.id === id)
      }
      const response = await fetch(`/api/rooms/${id}`)
      if (!response.ok) return mockRooms.find((r) => r.id === id)
      return response.json()
    },
    enabled: !!id,
  })
}

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { roomNumber: string; roomTypeId: number; status: RoomStatus }) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock create room:', data)
        return { id: Date.now(), ...data }
      }
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateRoomRequest }) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock update room:', id, data)
        const room = mockRooms.find((r) => r.id === id)
        return { ...room, ...data }
      }
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useDeleteRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock delete room:', id)
        return
      }
      await fetch(`/api/rooms/${id}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
