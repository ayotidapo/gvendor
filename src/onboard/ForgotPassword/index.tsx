'use client';

import Button, { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/Input/Input';
import { signInUser } from '@/redux/apis/setAuth';
import { createPasswordApi } from '@/redux/apis/vendor';
import { useDispatch, useSelector } from '@/redux/hooks';
import { setVendor } from '@/redux/reducers/vendor';
import jwt from 'jsonwebtoken';
import { useFormik } from 'formik';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IVendor } from '@/utils/interface';
import Link from 'next/link';

const ForgotPaswordPageSchema = Yup.object({
	email: Yup.string()
		.email('Enter valid email address')
		.required('Email is Required'),
});

const ForgotPaswordPage = () => {
	const dispatch = useDispatch();
	const sta = useSelector(state => state.vendor);

	const router = useRouter();
	const searchQ = useSearchParams();
	const verifiedToken = searchQ.get('token');
	const vendorId = searchQ.get('vendorId') as string;

	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: ForgotPaswordPageSchema,
		onSubmit: async values => {
			try {
				const { email } = values;
				const response = await createPasswordApi({
					email,
					token: verifiedToken,
				});
				const { vendor = {}, token = '' } = response?.data;
				dispatch(setVendor({ ...vendor, token }));
				localStorage.t_ = token;

				if (verifiedToken) {
					await signInUser({
						goodToken: token,
						vendorId,
					});
					router.replace(`/`);
					return;
				}

				router.replace(`/auth/terms-and-conditions?ck_token=${token}`);
			} catch (e: any) {
				toast.error(e?.message || 'Something went wrong');
			}
		},
	});

	const onLogin = async () => {
		toast.success('Login successful', { theme: 'colored' });
	};

	return (
		<form onSubmit={handleSubmit} className='auth__form'>
			<h2 className='auth_h2'>Forgot password</h2>
			<div>
				<Input
					{...getFieldProps('email')}
					error={touched.email ? errors.email : ''}
					type='text'
					placeholder='Enter email address'
				/>
			</div>

			<div className='mt-6'>
				<SimpleBtn>Get Link</SimpleBtn>
			</div>
			<p className='text-black pt-5 text-center'>
				Remeber your password?{' '}
				<Link
					href='/auth/login'
					className='text-[#f45d2c] subpixel-antialiased'
				>
					Sign in
				</Link>
			</p>
		</form>
	);
};

export default ForgotPaswordPage;
