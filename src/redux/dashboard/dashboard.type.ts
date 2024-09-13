export interface DashboardMetricsCount {
  data: {
    day: string
    total: number
    count: number
  }[]
}    

export interface DashboardSalesValue {
    data: {
      totalOrderValue: number
      completedOrderValue: number
      pendingOrderValue: number
      processingOrderValue: number
      totalOrderCount: number
      pendingOrderCount: number
      processingOrderCount: number
    }
}

export interface RecentOrdersResponse {
    success: boolean
    message: string
    data: {
      day: string
      total: number
      count: number
    }[]
  }