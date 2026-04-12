import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roomsApi, type AvailableRoomsSearchParams, type RoomsSearchParams } from '../../../api/rooms'
import type { CreateRoomRequest, Room, UpdateRoomRequest } from '../../../types'

export function useRooms(filters?: RoomsSearchParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['rooms', filters ?? null],
    queryFn: (): Promise<Room[]> => roomsApi.getAll(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useRoom(id: number) {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: (): Promise<Room> => roomsApi.getById(id),
    enabled: !!id,
  })
}

export function useAvailableRooms(filters?: AvailableRoomsSearchParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['rooms', 'available', filters ?? null],
    queryFn: (): Promise<Room[]> => {
      if (!filters) {
        return Promise.resolve([])
      }

      return roomsApi.getAvailable(filters)
    },
    enabled: (options?.enabled ?? true) && !!filters,
  })
}

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoomRequest) => roomsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoomRequest }) => roomsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useDeleteRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => roomsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
