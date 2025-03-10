export type ObjectData = Record<string, any>;
export interface IOption {
	label: string;
	value: string | number;
}

export interface IAddress {
	address: string;
	longitude?: string;
	latitude?: string;
	[key: string]: any;
}

export interface IVendor {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	businessName?: string;
	servicesOffered?: string[];
	website?: string;
	businessAddress?: IAddress;
	[key: string]: any;
}

export interface ServerProps {
	searchParams: Record<string, any>;
	params: Record<string, any>;
}

export interface sessionUser {
	goodToken?: string | undefined;
	id: string | number | null | undefined;
}

export interface IFilter {
	Page: string;
	Status?: string;
	limit?: string;
	Search?: string;
}
