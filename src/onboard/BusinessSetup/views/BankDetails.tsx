import React, { useState } from 'react';
import { SimpleBtn } from '@/atoms/buttons/Button';
import * as Yup from 'yup';
import { Input } from '@/atoms/input/Input';
import { useFormik } from 'formik';
import { updateBankAccountApi } from '@/redux/apis/business';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AllSet from './AllSet';

const validationSchema = Yup.object({
	accountNumber: Yup.string()
		.required('Business name is Required')
		.min(10, 'account number not less than 10 digit'),
	bankCode: Yup.string().required('bank code name is Required'),
	bankName: Yup.string().required('bank name name is Required'),
});

interface Props {
	setStep: (step: number) => void;
	setSuccess: (status: boolean) => void;
}
const BankDetails: React.FC<Props> = props => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			accountNumber: '',
			bankCode: '',
			bankName: '',
		},
		onSubmit: async values => {
			try {
				setIsLoading(true);
				await updateBankAccountApi(values);
				props.setSuccess(true);
				//props.setStep(2);
			} catch (e: any) {
				toast.error(`Error:${e?.message}`);
				props.setSuccess(false);
			} finally {
				setIsLoading(false);
			}
		},
		validationSchema,
	});

	return (
		<form onSubmit={handleSubmit}>
			<h3 className='h3 text-xl mb-4'>Bank Account details</h3>
			<Input
				{...getFieldProps('accountNumber')}
				error={touched.accountNumber ? errors.accountNumber : ''}
				placeholder='Account number'
			/>
			<Input
				{...getFieldProps('bankName')}
				error={touched.bankName ? errors.bankName : ''}
				placeholder='Bank name'
			/>
			<Input
				{...getFieldProps('bankCode')}
				error={touched.bankCode ? errors.bankCode : ''}
				placeholder='Account name'
			/>

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
