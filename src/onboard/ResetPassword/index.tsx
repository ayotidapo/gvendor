'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/Input/Input';

import { resetPasswordApi } from '@/redux/apis/vendor';

import { useFormik } from 'formik';

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object({
	password: Yup.string()
		.min(5, 'atleast 6 character is required')
		.required('password is required'),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('password is required'),
});

const CreatePaswordPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const searchQ = useSearchParams();
	const code = searchQ.get('code');
	const email = searchQ.get('email');

	if (!email || !code) notFound();
	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			password: '',
			confirm_password: '',
		},
		validationSchema,
		onSubmit: async values => {
			try {
				setLoading(true);
				const { password } = values;
				await resetPasswordApi({
					code,
					email,
					password,
				});
				toast.success(`password successfully reset, you can now login`);
				router.replace(`/auth,login`);
			} catch (e: any) {
				toast.error(e?.message || 'Something went wrong');
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<form onSubmit={handleSubmit} className='auth__form'>
			<h2 className='auth_h2'>Reset password</h2>
			<div>
				<Input
					{...getFieldProps('password')}
					error={touched.password ? errors.password : ''}
					type='password'
					placeholder='Enter your password'
					riconSvg='eye-x'
				/>

				<Input
					{...getFieldProps('confirm_password')}
					error={touched.confirm_password ? errors.confirm_password : ''}
					type='password'
					placeholder='Re-type your password'
					riconSvg='eye-x'
				/>
			</div>

			<div className='mt-6'>
				<SimpleBtn disabled={loading}>Reset Password</SimpleBtn>
			</div>
		</form>
	);
};

export default CreatePaswordPage;
