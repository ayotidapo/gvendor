export interface OrderResponse {
    status: string
}

export interface EditOrderResponse{
    status: string
}

export interface InitiateReturn{
    orderId: string
    reason: string
}

export interface EditReturnStatus{
    status: string
}

export interface RefundReturn{
    code: string
}