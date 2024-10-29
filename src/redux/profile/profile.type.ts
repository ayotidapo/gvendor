import { SelectedAddress } from '@/types/types';

export interface AvailableDay {
	open: boolean;
	openingTime?: string;
	closingTime?: string;
	_id: string;
}

export interface AvailableHours {
	[key: string]: { open: boolean; openingTime: string; closingTime: string };
}

export interface CreateProfile {
	businessName: string;
	businessAddress: {
		address: string;
		longitude: number;
		latitude: number;
		sourceGooglePlaceID: string;
	};
	website: string;
	socialMediaLinks: string[];
	servicesOffered: string[];
	businessStructure: string;
	yearsOfExperince: string;
	annualTurnOver: number;
	cacNumber: string;
	nafdacNumber: string;
	tinNumber: string;
	sonNumber: string;
}

export interface ProfileData {
	_id: string;
	name: string;
	email: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	phone: string;
	address: SelectedAddress;
	availableHours: AvailableHours;
	firstLogin: boolean;
	logo: string;
	website: string;
	businessDetails: BusinessDetails;
	nameOfPrimaryContact: string;
	positionOfPrimaryContact: string;
	settlementAccount: {
		accountName: string;
		accountNumber: string;
		bankCode: string;
		bankName: string;
	};
}

export interface BusinessDetails {
	businessName: string;
	businessAddress: {
		address: string;
		longitude: number;
		latitude: number;
		sourceGooglePlaceID: string;
	};
	website: string;
	socialMediaLinks: string[];
	servicesOffered: string[];
	businessStructure: string;
	yearsOfExperince: string;
	annualTurnOver: number;
	cacNumber: string;
	nafdacNumber: string;
	tinNumber: string;
	sonNumber: string;
	nameOfPrimaryContact: string;
	positionOfPrimaryContact: string;
}

export interface ProfileResponse {
	success: boolean;
	message: string;
	data: ProfileData[];
}

export interface UpdatePasswordData {
	currentPassword: string;
	newPassword: string;
}
