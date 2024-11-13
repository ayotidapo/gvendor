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
	orderitems: {
		productId: string;
		quantity: number;
		variants: Variant[];
		comboItems: ComboItem[];
		name: string;
		price: number;
	}[];
	createdAt: string;
	updatedAt: string;
	delivery: Delivery;
	personalInformation: PersonalInformation;
	__v: number;
}

export interface Variant {
	variantId: {
		name: string
	};
	value: string;
}

export interface ComboItem {
	name: string;
	quantity: number;
	price: number;
}

export interface OrderDets {
	_id: string;
	itemsOrdered: string[];
	quantity: number;
	status: string;
	date: string;
	price: number;
	customerFirstName: string;
	customerLastName: string;
}

export interface OrdersData {
	orders: OrderDets[];
	totalOrders: number;
	totalSales: number;
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
export interface OrderDetailResponse {
	success: boolean;
	message: string;
	data: Order;
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
