import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roomsApi } from '../../../api'
import type { CreateRoomRequest, Room, RoomStatus, UpdateRoomRequest } from '../../../types'

export function useRooms(status?: RoomStatus, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['rooms', status],
    queryFn: (): Promise<Room[]> => roomsApi.getAll(status),
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
