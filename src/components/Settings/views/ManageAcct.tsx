'use client';
import { SimpleBtn } from '@/atoms/buttons/Button';
import * as Yup from 'yup';
import EditInputBox, { EditGroupInputBox } from '@/molecules/EditInputBox';
import React, { useState } from 'react';
import DeleteAcct from './DeleteAcct';
import { useFormik } from 'formik';
import { changePasswordApi } from '@/redux/apis/vendor';
import { toast } from 'react-toastify';
import DeletePrompt from './DeletePrompt';

const validationSchema = Yup.object({
	currentPassword: Yup.string()
		.min(6, 'atleast 6 character is required')
		.required('cannot be empty'),
	newPassword: Yup.string()
		.min(5, 'atleast 6 character is required')
		.required('cannot be empty'),
	newPassword2: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Passwords must match')
		.required('cannot be empty'),
});

const ManageAcct = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [del, setDel] = useState<boolean>(false);
	const { getFieldProps, errors, touched, handleSubmit } = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			newPassword2: '',
		},
		onSubmit: async values => {
			try {
				setLoading(true);
				await changePasswordApi(values);
				toast.error(`Password successfully changed`);
			} catch {
				toast.error(`Error: could not change password`);
			} finally {
				setLoading(false);
			}
		},
		validationSchema,
	});

	if (del) return <DeletePrompt />;
	return (
		<form onSubmit={handleSubmit} className='manage_acct'>
			<EditGroupInputBox
				groupTitle='Manage Account'
				actionBtn='Change password'
				editText='Change password'
				isLoading={loading}
			>
				{({ isNonEdit }: any) => {
					return (
						<div>
							<EditInputBox
								{...getFieldProps('currentPassword')}
								type='password'
								placeholder='Enter your current password'
								title='Change password'
								nonEditable={isNonEdit}
								riconSvg={isNonEdit ? '' : 'eye-x'}
								error={touched?.currentPassword ? errors?.currentPassword : ''}
							/>

							{isNonEdit && (
								<span>You last updated your password on Sep 18, 2023</span>
							)}
							<EditInputBox
								nonEditable={isNonEdit}
								type='password'
								{...getFieldProps('newPassword')}
								placeholder='Enter a new password'
								riconSvg={isNonEdit ? '' : 'eye-x'}
								error={touched?.newPassword ? errors?.newPassword : ''}
							/>
							<EditInputBox
								{...getFieldProps('newPassword2')}
								type='password'
								placeholder='Re-enter your new password'
								nonEditable={isNonEdit}
								riconSvg={isNonEdit ? '' : 'eye-x'}
								error={touched?.newPassword2 ? errors?.newPassword2 : ''}
							/>
						</div>
					);
				}}
			</EditGroupInputBox>
			<hr className='mb-4 divider' />
			<DeleteAcct onDelete={() => setDel(true)} />
		</form>
	);
};

export default ManageAcct;
