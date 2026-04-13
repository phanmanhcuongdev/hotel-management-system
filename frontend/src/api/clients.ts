import { apiClient } from './client'
import type { ClientDetail, ClientSummary, CreateClientRequest, UpdateClientRequest } from '../types'

export interface ClientsSearchParams {
  keyword?: string
  needsReview?: boolean
}

export const clientsApi = {
  getAll: async (params?: ClientsSearchParams): Promise<ClientSummary[]> => {
    const response = await apiClient.get<ClientSummary[]>('/clients', { params })
    return response.data
  },

  getById: async (id: number): Promise<ClientDetail> => {
    const response = await apiClient.get<ClientDetail>(`/clients/${id}`)
    return response.data
  },

  create: async (data: CreateClientRequest): Promise<ClientSummary> => {
    const response = await apiClient.post<ClientSummary>('/clients', data)
    return response.data
  },

  update: async (id: number, data: UpdateClientRequest): Promise<ClientSummary> => {
    const response = await apiClient.patch<ClientSummary>(`/clients/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/clients/${id}`)
  },
}
