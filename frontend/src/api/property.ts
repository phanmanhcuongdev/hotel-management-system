import { apiClient } from './client'
import type { PropertyProfile, UpdatePropertyProfileRequest } from '../types'

export const propertyApi = {
  getProfile: async (): Promise<PropertyProfile> => {
    const response = await apiClient.get<PropertyProfile>('/property')
    return response.data
  },

  updateProfile: async (data: UpdatePropertyProfileRequest): Promise<PropertyProfile> => {
    const response = await apiClient.patch<PropertyProfile>('/property', data)
    return response.data
  },
}
