'use client';

import { Login } from '@/types/types';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const LoginSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('A valid email is required'),
	password: Yup.string().required('Please enter your password'),
});

const GetBack = () => {
	// const [login, { isLoading }] = useLoginMutation();
	// const dispatch = useAppDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: values => {
			// if (!isLoading) {
			// 	onLogin(values);
			// }
		},
	});

	const onLogin = async (credentials: Login) => {
		//try {
		//const res: unknown = await login(credentials);
		//const userAuthData = res as AuthResponse;
		//if (userAuthData?.data?.user) {
		//dispatch(updateUserWithAuth(userAuthData));
		toast.success('Login successful', { theme: 'colored' });
		const redirect = searchParams.get('redirect');
		router.push(redirect || '/');
		//	}
		// } catch (error) {
		// 	return error;
		// }
	};

	return (
		<div className='w-[420px]'>
			<h2 className='auth_h2'>We&apos;ll contact you soon!</h2>
			<p className='text-center'>
				Thanks for signing up to sell on Good! We’re currently reviewing your
				request and will contact you within 1–3 business days once the process
				is complete.
			</p>
		</div>
	);
};

export default GetBack;
