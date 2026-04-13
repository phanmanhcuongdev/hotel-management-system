import { useQuery } from '@tanstack/react-query'
import { reportsApi, type ReportFilters } from '../../../api/reports'
import type { OccupancyReport, ReportOverview, RevenueReport } from '../../../types'

export function useReportOverview(filters?: ReportFilters, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['reports', 'overview', filters ?? null],
    queryFn: (): Promise<ReportOverview> => reportsApi.getOverview(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useRevenueReport(filters?: ReportFilters, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['reports', 'revenue', filters ?? null],
    queryFn: (): Promise<RevenueReport> => reportsApi.getRevenue(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useOccupancyReport(filters?: ReportFilters, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['reports', 'occupancy', filters ?? null],
    queryFn: (): Promise<OccupancyReport> => reportsApi.getOccupancy(filters),
    enabled: options?.enabled ?? true,
  })
}
