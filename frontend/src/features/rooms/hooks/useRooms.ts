import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roomsApi } from '../../../api'
import { mockRooms } from '../../../data/mockData'
import type { CreateRoomRequest, Room, RoomStatus, UpdateRoomRequest } from '../../../types'

const USE_MOCK = false
const USE_DEV_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_FALLBACK !== 'false'

function filterMockRooms(status?: RoomStatus) {
  return status ? mockRooms.filter((room) => room.status === status) : mockRooms
}

export function useRooms(status?: RoomStatus) {
  return useQuery({
    queryKey: ['rooms', status],
    queryFn: async (): Promise<Room[]> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return filterMockRooms(status)
      }

      try {
        return await roomsApi.getAll(status)
      } catch (error) {
        if (!USE_DEV_FALLBACK) {
          throw error
        }

        console.warn('Rooms API unavailable, using mock rooms for frontend flow.', error)
        return filterMockRooms(status)
      }
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

      try {
        return await roomsApi.getById(id)
      } catch (error) {
        if (!USE_DEV_FALLBACK) {
          throw error
        }

        console.warn(`Room API unavailable for room #${id}, using mock room.`, error)
        return mockRooms.find((room) => room.id === id)
      }
    },
    enabled: !!id,
  })
}

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return {
          id: Date.now(),
          roomNumber: data.roomNumber,
          status: data.status,
          type: mockRooms.find((room) => room.type.id === data.roomTypeId)?.type ?? mockRooms[0].type,
        } satisfies Room
      }

      return roomsApi.create(data)
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
        const room = mockRooms.find((item) => item.id === id)
        const roomType = mockRooms.find((item) => item.type.id === data.roomTypeId)?.type ?? room?.type

        return {
          ...room,
          roomNumber: data.roomNumber,
          status: data.status,
          type: roomType,
        } as Room
      }

      return roomsApi.update(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
