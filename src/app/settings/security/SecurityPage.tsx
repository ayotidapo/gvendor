import Button from '@/components/buttons/Button';
import TextInput from '@/components/input/TextInput';
import { Header } from '@/components/typography/Header';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import parse from 'html-react-parser';
import { CheckIcon } from '@heroicons/react/24/outline';
import * as Yup from 'yup';
import CheckboxInput from '@/components/common/Checkbox';
import { useDeleteProfileMutation, useUpdatePasswordMutation } from '@/redux/profile/profile.slice';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

const changePasswordSchema = Yup.object({
	currentPassword: Yup.string().required('Current password is required'),
	newPassword: Yup.string().required('New password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Passwords must match')
		.required('Confirm new password is required'),
});

const reasons = [
	'I no longer use this account.',
	'I have another account',
	'I want to create a new account',
	'Concerns about account security/Unauthorized activity',
	'Privacy-related concerns.',
	`I have open issues with <span className={"font-extrabold recoleta"}>Good</span> Things Co.`,
	'I prefer not to disclose a reason.',
];

const SecurityPage = () => {
	const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
	const [deleteProfile] = useDeleteProfileMutation();
	const [deleteReason, setDeleteReason] = useState('');
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleDeleteAccount = () => {
		if (deleteReason) {
			deleteProfile({ reason: deleteReason });
			toast.success('Account deleted successfully');
		} else {
			toast.error('Please select a reason before deleting your account');
		}
	};

	return (
		<div className='pt-8 space-y-4'>
			<div>
				<Header header={'Password'} />
			</div>
			<Formik
				initialValues={{
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				validationSchema={changePasswordSchema}
				onSubmit={values => {
					if (!isLoading) {
						const { currentPassword, newPassword } = values;
						updatePassword({ currentPassword, newPassword });
						toast.success('Password updated successfully');
					}
				}}
			>
				{({
					values,
					handleBlur,
					handleChange,
					errors,
					touched,
					handleSubmit,
				}) => (
					<Form onSubmit={handleSubmit}>
						<div className='space-y-4 md:w-[800px]'>
							<TextInput
								type={'password'}
								placeholder={'Current password'}
								name={'currentPassword'}
								value={values.currentPassword}
								errors={touched.currentPassword ? errors?.currentPassword : ''}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<TextInput
								type={'password'}
								placeholder={'New password'}
								name={'newPassword'}
								value={values.newPassword}
								errors={touched.newPassword ? errors?.newPassword : ''}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<TextInput
								type={'password'}
								placeholder={'Confirm password'}
								name={'confirmPassword'}
								value={values.confirmPassword}
								errors={touched.confirmPassword ? errors?.confirmPassword : ''}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
						<div className='mt-6 w-[183px]'>
							<Button label={'Change password'} type='submit' />
						</div>
					</Form>
				)}
			</Formik>

			<div className='pt-[74px] gap-6'>
				<div>
					<Header header={'Close your account'} className='text-[#F25A68]' />
				</div>
				<div className='text-secondary-black pt-4'>
					Closing your account means you will no longer have access to this
					account. You will lose all your sales, orders, teams and other data.
				</div>
				<div>
					<div className='pt-4'>
						Please select the reason for closing your Good account
					</div>
					{reasons.map((reason, idx) => (
						<div key={idx} className='relative flex items-center py-2'>
							<div
								onClick={() => setDeleteReason(reason)}
								className='flex w-full hover:cursor-pointer'
							>
								<div>
									<div
										className={clsx(
											'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
											{
												'bg-brand-orange border-brand-orange':
													reason === deleteReason,
												'border-default-gray': reason !== deleteReason,
											}
										)}
									>
										{reason === deleteReason && (
											<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
										)}
									</div>
								</div>
								<div className='ml-4 text-md space-y-6'>{parse(reason)}</div>
							</div>
						</div>
					))}
					<CheckboxInput
						extraClass='pt-4'
						name={''}
						label={
							'By selecting this checkbox, you agree to permanently delete your account and all your data'
						}
						checked={confirmDelete}
						onChange={() => setConfirmDelete(!confirmDelete)}
					/>
					<div className='mt-6 w-[183px]'>
						<Button
							name='delete'
							label={'Delete account'}
							onClick={handleDeleteAccount}
							disabled={!deleteReason || !confirmDelete}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecurityPage;
