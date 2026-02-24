import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockRooms } from '../../../data/mockData'
import type { RoomStatus, Room, UpdateRoomRequest } from '../../../types'

// Use mock data for demo - replace with API calls in production
const USE_MOCK = false

export function useRooms(status?: RoomStatus) {
  return useQuery({
    queryKey: ['rooms', status],
    queryFn: async (): Promise<Room[]> => {
      if (USE_MOCK) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))
        if (status) {
          return mockRooms.filter((room) => room.status === status)
        }
        return mockRooms
      }
      // Real API call would go here
      const response = await fetch(`/api/rooms${status ? `?status=${status}` : ''}`)
      return response.json()
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
