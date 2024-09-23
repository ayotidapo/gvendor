export interface Delivery {
    type: string;
    charge: number;
    address: string;
    contact: string;
    contactNumber: string;
    contactCondition: string;
  }
  
  export interface PersonalInformation {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emailNotifications: boolean;
  }
  
  export interface Metadata {
    deliveryChargeEstimateId: string;
  }
  
  export interface Order {
    _id: string;
    userId: string;
    vendorId: string;
    amount: number;
    serviceCharge: number;
    currency: string;
    paymentStatus: string;
    orderNumber: string;
    buyForSelf: boolean;
    status: string;
    metadata: Metadata;
    createdAt: string;
    updatedAt: string;
    delivery: Delivery;
    personalInformation: PersonalInformation;
    __v: number;
  }
  
  export interface OrdersData {
    docs: Order[];
    total: number;
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
  
  export interface OrderResponse {
    success: boolean;
    message: string;
    data: OrdersData;
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