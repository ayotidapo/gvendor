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

export interface EditOrderResponse {
	status: string;
}

export interface InitiateReturn {
	orderId: string;
	reason: string;
}

export interface EditReturnStatus {
	status: string;
}

export interface RefundReturn {
	code: string;
}
