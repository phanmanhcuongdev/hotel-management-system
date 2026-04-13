import { apiClient } from './client'
import type { OccupancyReport, ReportOverview, RevenueReport } from '../types'

export interface ReportFilters {
  startDate?: string
  endDate?: string
  roomId?: number
}

export const reportsApi = {
  getOverview: async (params?: ReportFilters): Promise<ReportOverview> => {
    const response = await apiClient.get<ReportOverview>('/reports/overview', { params })
    return response.data
  },

  getRevenue: async (params?: ReportFilters): Promise<RevenueReport> => {
    const response = await apiClient.get<RevenueReport>('/reports/revenue', { params })
    return response.data
  },

  getOccupancy: async (params?: ReportFilters): Promise<OccupancyReport> => {
    const response = await apiClient.get<OccupancyReport>('/reports/occupancy', { params })
    return response.data
  },
}
