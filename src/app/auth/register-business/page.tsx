import React from 'react';
import RegisterBusiness from '@/onboard/RegisterBusiness';
import { ServerProps } from '@/utils/interface';
import { jwtDecode } from 'jwt-decode';
import { notFound } from 'next/navigation';

interface IVendor {
	reference: string;
	businessName: string;
	email: string;
	[key: string]: any;
}

const RegisterBusinessPage: React.FC<ServerProps> = async props => {
	const { searchParams } = props;
	const token = searchParams?.token;
	let vendor;

	if (token) {
		try {
			vendor = jwtDecode(token) as IVendor;
		} catch {
			notFound();
		}
	}

	return <RegisterBusiness vendor={vendor} />;
};

export default RegisterBusinessPage;
