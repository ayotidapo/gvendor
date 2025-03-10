export type LoginValues = {
	email: string;
	password: string;
};

export type Login = {
	email: string;
	password: string;
};

export type AuthResponse = {
	data: {
		user: User;
	};
	token?: string | null;
};

export type ResetPasswordResponse = {
	data: User;
	success: boolean;
	message: string;
};

export type User = {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	phoneNumber: string;
};

export type UserUpdate = {
	[firstname: string]: string;
	lastname: string;
	phoneNumber: string;
};

export type ForgotPassword = {
	email: string;
};

export type SelectedAddress = {
	address: string;
	latitude: number;
	longitude: number;
	sourceGooglePlaceID: string;
	_id?: string;
};

export type APIErrorResponse = {
	error: {
		status: number;
		data: {
			success: boolean;
			error: string;
		};
	};
	isUnhandledError: boolean;
	meta: {
		request: object;
		response: object;
	};
};

export type ResetPassword = {
	password: string;
	repeatPassword?: string;
	email?: string;
	code?: string;
};

export type changePassword = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export interface Auth {
	signedIn: boolean;
	user: User;
	token?: string | null;
}

export type StatusTypes = 'success' | 'fail' | 'warn';

export type PaymentTypes = 'paid' | 'not Paid';

export interface Transactions {
	_id: string;
	userId: string;
	amount: number;
	type: string;
	createdAt: string;
	metadata: {
		intent: string;
		reference: string;
	};
	status: string;
}

export interface TransactionsResponse {
	_id: string;
	type: string;
	amount: string;
	createdAt: string;
	success: boolean;
	message: string;
	data: {
		transactions: Transactions[];
		totalCount: number;
	};
}

export interface DailyResponse {
	success: boolean;
	message: string;
	data: {
		day: string;
		total: number;
		count: number;
	}[];
}

export interface CustomerReport {
	success: boolean;
	message: string;
	data: {
		day: string;
		total: number;
		count: number;
	};
}
