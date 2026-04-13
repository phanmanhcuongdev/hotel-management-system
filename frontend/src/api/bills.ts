import { apiClient } from './client'
import type { BillDetail, BillLedgerItem, BillSummary, CreateBillRequest, PaymentType } from '../types'

export interface BillsSearchParams {
  keyword?: string
  bookingId?: number
  paymentType?: PaymentType
  paymentDateFrom?: string
  paymentDateTo?: string
}

export const billsApi = {
  getAll: async (filters?: BillsSearchParams): Promise<BillLedgerItem[]> => {
    const params = {
      keyword: filters?.keyword || undefined,
      bookingId: filters?.bookingId || undefined,
      paymentType: filters?.paymentType || undefined,
      paymentDateFrom: filters?.paymentDateFrom || undefined,
      paymentDateTo: filters?.paymentDateTo || undefined,
    }

    const response = await apiClient.get<BillLedgerItem[]>('/bills', { params })
    return response.data
  },

  getById: async (billId: number): Promise<BillDetail> => {
    const response = await apiClient.get<BillDetail>(`/bills/${billId}`)
    return response.data
  },

  getByBookingId: async (bookingId: number): Promise<BillSummary> => {
    const response = await apiClient.get<BillSummary>(`/bookings/${bookingId}/bill`)
    return response.data
  },

  createForBooking: async (bookingId: number, data: CreateBillRequest): Promise<BillSummary> => {
    const response = await apiClient.post<BillSummary>(`/bookings/${bookingId}/bill`, data)
    return response.data
  },
}
