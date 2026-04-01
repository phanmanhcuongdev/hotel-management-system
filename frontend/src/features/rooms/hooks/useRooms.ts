import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { RoomStatus, Room, UpdateRoomRequest } from '../../../types'

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

function isRoomLike(value: unknown): value is Room {
  if (!value || typeof value !== 'object') {
    return false
  }

  const room = value as Partial<Room>

  return typeof room.id === 'number' && typeof room.roomNumber === 'string' && typeof room.status === 'string'
}

async function loadRoomsFromApi(status?: RoomStatus): Promise<Room[]> {
  const response = await fetch(`/api/rooms${status ? `?status=${status}` : ''}`)
  const payload = await readJsonSafely(response)

  if (!response.ok || !Array.isArray(payload)) {
    throw new Error('Khong tai duoc danh sach rooms tu API.')
  }

  return payload.filter(isRoomLike) as Room[]
}

async function loadRoomFromApi(id: number): Promise<Room | undefined> {
  const response = await fetch(`/api/rooms/${id}`)
  const payload = await readJsonSafely(response)

  if (!response.ok || !payload || Array.isArray(payload)) {
    throw new Error(`Khong tai duoc room #${id} tu API.`)
  }

  return payload as Room
}

async function createRoomApi(data: { roomNumber: string; roomTypeId: number; status: RoomStatus }): Promise<Room> {
  const response = await fetch('/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to create room')
  return response.json()
}

async function updateRoomApi({ id, data }: { id: number; data: UpdateRoomRequest }): Promise<Room> {
  const response = await fetch(`/api/rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update room')
  return response.json()
}

async function deleteRoomApi(id: number): Promise<void> {
  const response = await fetch(`/api/rooms/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete room')
}

export function useRooms(status?: RoomStatus) {
  return useQuery({
    queryKey: ['rooms', status],
    queryFn: () => loadRoomsFromApi(status),
  })
}

export function useRoom(id: number) {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => loadRoomFromApi(id),
    enabled: !!id,
  })
}

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRoomApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateRoomApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useDeleteRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteRoomApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
