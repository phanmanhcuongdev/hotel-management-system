import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roomTypesApi, type CreateRoomTypeRequest, type RoomTypesSearchParams, type UpdateRoomTypeRequest } from '../../../api/roomTypes'
import type { RoomType } from '../../../types'

export function useRoomTypes(filters?: RoomTypesSearchParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['room-types', filters ?? null],
    queryFn: (): Promise<RoomType[]> => roomTypesApi.getAll(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useCreateRoomType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoomTypeRequest) => roomTypesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-types'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateRoomType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoomTypeRequest }) => roomTypesApi.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['room-types'] })
      queryClient.invalidateQueries({ queryKey: ['room-types', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useDeleteRoomType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => roomTypesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-types'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
