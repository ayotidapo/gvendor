export interface AvailableDay {
	open: boolean;
	openingTime?: string;
	closingTime?: string;
	_id: string;
}

export interface AvailableHours {
	[key: string]: { open: boolean; openingTime: string; closingTime: string };
}

export interface ProfileData {
	_id: string;
	name: string;
	email: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	phone: string;
	address: string;
	availableHours: AvailableHours;
	firstLogin: boolean;
	logo: string;
	website: string;
}

export interface ProfileResponse {
	success: boolean;
	message: string;
	data: ProfileData[];
}
