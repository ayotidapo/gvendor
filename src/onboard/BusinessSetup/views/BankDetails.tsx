'use client';
import React, { useEffect, useState } from 'react';
import { SimpleBtn } from '@/atoms/buttons/Button';
import * as Yup from 'yup';
import { Input } from '@/atoms/Input/Input';
import { useFormik } from 'formik';
import { updateBankAccountApi } from '@/redux/apis/business';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import AllSet from './AllSet';
import { signInUser } from '@/redux/apis/setAuth';
import { useSelector } from '@/redux/hooks';
import Select from '@/atoms/Input/Select';
import Fetch from '@/utils/fetch';
import { IOption } from '@/utils/interface';
import { regex } from '@/utils/constants';
import { Spinner } from '@/molecules/LoadingPage';

const validationSchema = Yup.object({
	accountNumber: Yup.string()
		.required('Business name is Required')
		.min(10, 'account number not less than 10 digit'),
	bankCode: Yup.string().required('bank code name is Required'),
	accountName: Yup.string().required('account name not found'),
});

interface Props {
	setStep: (step: number) => void;
	setSuccess: (status: boolean) => void;
	banks: IOption[];
}
const BankDetails: React.FC<Props> = props => {
	const router = useRouter();
	const vendor = useSelector(state => state.vendor);
	const [isLoading, setIsLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const searchQ = useSearchParams();
	const token = searchQ.get('ck_token') as string;

	const {
		setFieldTouched,
		handleSubmit,
		values,
		getFieldProps,
		errors,
		touched,
		setFieldValue,
		setFieldError,
	} = useFormik({
		initialValues: {
			accountNumber: '',
			bankCode: '',
			accountName: '',
		},

		onSubmit: async values => {
			try {
				setIsLoading(true);
				await updateBankAccountApi(values);
				// if Invited user: do this
				props.setSuccess(true);
				await signInUser({
					goodToken: token,
					vendorId: vendor?._id,
					redirect: false,
				});
				//props.setStep(2);
				//router.replace(`/`);
				//else: do this
				//go to step 3
			} catch (e: any) {
				toast.error(`Error:${e?.message}`);
				props.setSuccess(false);
			} finally {
				setIsLoading(false);
			}
		},
		validationSchema,
	});
	const { bankCode, accountNumber } = values;

	useEffect(() => {
		if (!bankCode || accountNumber.length < 10) {
			console.log(bankCode, 8);
			setFieldValue('accountName', '');
			setFieldValue('bankCode', '');
			return;
		}
		console.log(bankCode, 9);
		getBankDetails();
	}, [bankCode, accountNumber]);

	const getBankDetails = async () => {
		try {
			setLoading(true);
			setFieldError('accountName', '');
			const response = await Fetch(
				`/vendor/account-name?bankCode=${bankCode}&accountNumber=${accountNumber}`
			);
			setFieldValue('accountName', response?.data);
		} catch {
			setFieldError('accountName', 'account name not found');
			setFieldTouched('accountName', true);
		} finally {
			setLoading(false);
		}
	};

	console.log({ errors, touched });

	return (
		<form onSubmit={handleSubmit}>
			<h3 className='h3 text-xl mb-4'>Bank Account details</h3>
			<Input
				{...getFieldProps('accountNumber')}
				error={touched.accountNumber ? errors.accountNumber : ''}
				placeholder='Account number'
				onChange={e => {
					const { name, value } = e?.target;
					if (!regex.onlyDigits.test(value)) return;
					setFieldValue(name, value);
				}}
			/>
			<Select
				name='bankCode'
				value={bankCode}
				error={touched.bankCode ? errors.bankCode : ''}
				placeholder='select your bank code'
				options={props?.banks}
				onChange={e => {
					setFieldValue('bankCode', e?.target.value);
				}}
			/>
			<Input
				{...getFieldProps('accountName')}
				error={touched.accountName ? errors.accountName : ''}
				placeholder='Account name'
				readOnly
			/>
			{loading && <Spinner />}
			<SimpleBtn className='normal' disabled={isLoading}>
				Save & Continue
			</SimpleBtn>
		</form>
	);
};

export default BankDetails;

//for-bank-code-
{
	/* <Input
	{...getFieldProps('bankCode')}
	error={touched.bankCode ? errors.bankCode : ''}
	onChange={e => {
		const { name, value } = e?.target;
		if (!regex.onlyDigits.test(value)) return;
		setFieldValue(name, value);
	}}
	placeholder='Account name'
/>; */
}
