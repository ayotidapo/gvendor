import React, { Suspense } from 'react';
import RegisterBusiness from '@/onboard/RegisterBusiness';
import { ServerProps } from '@/utils/interface';
import jwt from 'jsonwebtoken';
import { notFound } from 'next/navigation';

interface IVendor {
	reference: string;
	businessName: string;
	email: string;
	[key: string]: any;
}

const RegisterBusinessPage: React.FC<ServerProps> = async props => {
	const { searchParams } = props;
	const { ck_token = '', token = '' } = searchParams;
	const anyToken = token || ck_token;
	let vendor;

	if (anyToken) {
		try {
			vendor = jwt.decode(anyToken) as IVendor;
		} catch {
			notFound();
		}
	}

	//console.log({ vendor });

	return <RegisterBusiness vendor={vendor} token={anyToken} />;
};

export default RegisterBusinessPage;
