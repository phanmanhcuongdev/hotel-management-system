export type PaymentType = 'CASH' | 'CARD' | 'BANK_TRANSFER'

export interface BillServiceItem {
  serviceId: number
  serviceName: string
  unit: string
  quantity: number
  unitPrice: number
  discount: number
  totalAmount: number
}

export interface BillSummary {
  billId: number | null
  bookingId: number
  bookingStatus: string
  guestName: string
  roomNumber: string | null
  checkIn: string
  checkOut: string
  nights: number
  bookingDiscount: number
  bookingNote: string | null
  roomCharge: number
  serviceCharge: number
  totalAmount: number
  paidAmount: number | null
  paymentType: PaymentType | null
  paymentDate: string | null
  note: string | null
  billCreated: boolean
  services: BillServiceItem[]
}

export interface BillLedgerItem {
  billId: number
  bookingId: number
  guestName: string
  roomNumber: string | null
  bookingStatus: string
  paymentAmount: number
  paymentType: PaymentType
  paymentDate: string
  note: string | null
}

export interface BillOperator {
  id: number
  username: string
  fullName: string
}

export interface BillDetail {
  bill: BillLedgerItem
  processedBy: BillOperator | null
  summary: BillSummary
}

export interface CreateBillRequest {
  paymentType: PaymentType
  note?: string
}
