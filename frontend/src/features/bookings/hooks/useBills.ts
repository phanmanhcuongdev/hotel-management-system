import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { billsApi } from '../../../api'
import type { BillSummary, CreateBillRequest } from '../../../types'

export function useBookingBill(bookingId?: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['bills', 'booking', bookingId ?? null],
    queryFn: (): Promise<BillSummary> => billsApi.getByBookingId(bookingId as number),
    enabled: (options?.enabled ?? true) && !!bookingId,
  })
}

export function useCreateBookingBill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ bookingId, data }: { bookingId: number; data: CreateBillRequest }) => billsApi.createForBooking(bookingId, data),
    onSuccess: (summary) => {
      queryClient.invalidateQueries({ queryKey: ['bills', 'booking', summary.bookingId] })
      queryClient.invalidateQueries({ queryKey: ['bills', 'ledger'] })
      queryClient.invalidateQueries({ queryKey: ['bills', 'detail'] })
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}
