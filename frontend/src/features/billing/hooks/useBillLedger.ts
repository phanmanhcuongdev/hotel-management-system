import { useQuery } from '@tanstack/react-query'
import { billsApi, type BillsSearchParams } from '../../../api/bills'
import type { BillDetail, BillLedgerItem } from '../../../types'

export function useBillLedger(filters?: BillsSearchParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['bills', 'ledger', filters ?? null],
    queryFn: (): Promise<BillLedgerItem[]> => billsApi.getAll(filters),
    enabled: options?.enabled ?? true,
  })
}

export function useBillDetail(billId?: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['bills', 'detail', billId ?? null],
    queryFn: (): Promise<BillDetail> => billsApi.getById(billId as number),
    enabled: (options?.enabled ?? true) && !!billId,
  })
}
