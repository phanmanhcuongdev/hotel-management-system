import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { roomsApi } from '../../../api'
import type { RoomStatus, CreateRoomRequest, UpdateRoomRequest } from '../../../types'

export function useRooms(status?: RoomStatus) {
  return useQuery({
    queryKey: ['rooms', status],
    queryFn: () => roomsApi.getAll(status),
  })
}

export function useRoom(id: number) {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => roomsApi.getById(id),
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
    mutationFn: ({ id, data }: { id: number; data: UpdateRoomRequest }) =>
      roomsApi.update(id, data),
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
