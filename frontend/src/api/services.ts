import { apiClient } from './client'
import type { AddUsedServiceRequest, CreateServiceRequest, ServiceCatalogItem, UsedServiceItem } from '../types'

export const servicesApi = {
  getAll: async (): Promise<ServiceCatalogItem[]> => {
    const response = await apiClient.get<ServiceCatalogItem[]>('/services')
    return response.data
  },

  create: async (data: CreateServiceRequest): Promise<ServiceCatalogItem> => {
    const response = await apiClient.post<ServiceCatalogItem>('/services', data)
    return response.data
  },

  update: async (id: number, data: CreateServiceRequest): Promise<ServiceCatalogItem> => {
    const response = await apiClient.patch<ServiceCatalogItem>(`/services/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/services/${id}`)
  },

  getUsedByBookingId: async (bookingId: number): Promise<UsedServiceItem[]> => {
    const response = await apiClient.get<UsedServiceItem[]>(`/bookings/${bookingId}/used-services`)
    return response.data
  },

  addUsedToBooking: async (bookingId: number, data: AddUsedServiceRequest): Promise<UsedServiceItem> => {
    const response = await apiClient.post<UsedServiceItem>(`/bookings/${bookingId}/used-services`, data)
    return response.data
  },
}
