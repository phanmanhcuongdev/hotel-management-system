export interface ReportRoomRevenueItem {
  roomId: number
  roomNumber: string
  revenue: number
  billCount: number
}

export interface ReportDailyRevenueItem {
  date: string
  revenue: number
  billCount: number
}

export interface RevenueReport {
  startDate: string
  endDate: string
  roomId?: number | null
  totalRevenue: number
  totalBills: number
  averageBillAmount: number
  dailyRevenue: ReportDailyRevenueItem[]
  revenueByRoom: ReportRoomRevenueItem[]
  calculatedFromBills: boolean
}

export interface ReportDailyOccupancyItem {
  date: string
  occupiedRooms: number
  availableRooms: number
  occupancyRate: number
  vacancyRate: number
}

export interface OccupancyReport {
  startDate: string
  endDate: string
  roomId?: number | null
  totalOperationalRooms: number
  totalRoomDays: number
  occupiedRoomDays: number
  availableRoomDays: number
  occupancyRate: number
  vacancyRate: number
  dailyOccupancy: ReportDailyOccupancyItem[]
  approximateFromScheduledStays: boolean
}

export interface ReportOverview {
  startDate: string
  endDate: string
  roomId?: number | null
  totalRevenue: number
  totalBills: number
  averageBillAmount: number
  occupiedRoomDays: number
  availableRoomDays: number
  occupancyRate: number
  vacancyRate: number
  topRevenueRoom?: ReportRoomRevenueItem | null
  revenueCalculatedFromBills: boolean
  occupancyApproximate: boolean
}
