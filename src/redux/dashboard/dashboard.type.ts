export interface DashboardMetricsCount {
    data: {
        totalOrder: number
        completedOrder: number
        pendingOrder: number
        processingOrder: number
        totalOrderCount: number
        pendingOrderCount: number
        processingOrderCount: number
    }
}    

export interface DashboardSalesValue {
    data: {
      totalOrderValue: number
      pendingOrderValue: number
      processingOrderValue: number
      completedOrderValue: number
      cancelledOrderValue: number
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