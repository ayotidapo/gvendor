'use client';

import Button, { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/Input/Input';
import { createPasswordApi } from '@/redux/apis/vendor';
import { useDispatch, useSelector } from '@/redux/hooks';
import { setVendor } from '@/redux/reducers/vendor';

import { useFormik } from 'formik';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const CreatePasswordSchema = Yup.object({
	password: Yup.string()
		.min(5, 'atleast 6 character is required')
		.required('password is required'),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('password is required'),
});

const CreatePaswordPage = () => {
	const dispatch = useDispatch();
	const sta = useSelector(state => state.vendor);

	const router = useRouter();
	const searchQ = useSearchParams();
	const vendorId = searchQ.get('vendorId');

	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			password: '',
			confirm_password: '',
		},
		validationSchema: CreatePasswordSchema,
		onSubmit: async values => {
			try {
				const { password } = values;
				const response = await createPasswordApi({ password, vendorId });
				const { vendor = {}, token = '' } = response?.data;
				dispatch(setVendor({ ...vendor, token }));
				localStorage.t_ = token;
				router.replace(`/auth/terms-and-conditions?ck_token=${token}`);
			} catch (e: any) {
				toast.error(`${e?.message} || Something went wrong`);
			}
		},
	});

	const onLogin = async () => {
		toast.success('Login successful', { theme: 'colored' });
	};

	return (
		<form onSubmit={handleSubmit} className='w-[420px]'>
			<h2 className='auth_h2'>Create a password for your account</h2>
			<div>
				<Input
					{...getFieldProps('password')}
					error={touched.password ? errors.password : ''}
					type='password'
					placeholder='Enter your password'
				/>

				<Input
					{...getFieldProps('confirm_password')}
					error={touched.confirm_password ? errors.confirm_password : ''}
					type='password'
					placeholder='Re-type your password'
				/>
			</div>

			<div className='mt-6'>
				<SimpleBtn>Sign in</SimpleBtn>
			</div>
		</form>
	);
};

export default CreatePaswordPage;
