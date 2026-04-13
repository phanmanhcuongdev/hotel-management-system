import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { usersApi, type UsersSearchParams } from '../../../api/users'
import type { CreateUserRequest, UpdateUserRequest, User } from '../../../types'

export function useUsers(filters?: UsersSearchParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['users', filters ?? null],
    queryFn: (): Promise<User[]> => usersApi.getAll(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useUser(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: (): Promise<User> => usersApi.getById(id),
    enabled: (options?.enabled ?? true) && !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserRequest) => usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) => usersApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
