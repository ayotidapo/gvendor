import Radio from '@/atoms/Radio';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import ToggleDisplay from '@/molecules/ToggleDisplay';
import { Field, useFormik } from 'formik';
import React, { useState } from 'react';
interface Props {
	children?: React.ReactNode;
}

const settings = [
	{ title: 'New order notification', name: 'newOrder' },
	{ title: 'Settlement and withdrawal', name: 'settlementAndWithdrawal' },
	{ title: 'Low stock alerts', name: 'lowStockAlerts' },
	{ title: 'Sign in activity', name: 'signInActivity' },
];
const Notification: React.FC<Props> = ({ children }) => {
	const [isNonEdit, setIsNonEdit] = useState<boolean>(true);

	const formik = useFormik({
		initialValues: {
			newOrder: [],
			settlementAndWithdrawal: [],
			lowStockAlerts: [],
			signInActivity: [],
		},
		onSubmit: () => {},
		//enableReinitialize,
	});

	return (
		<div className='notification'>
			<h2 className='h2'>Notification Settings</h2>
			{settings?.map(setting => (
				<ToggleDisplay title={setting?.title} key={setting.title}>
					<div className='my-5 cursor-pointer'>
						<Radio
							{...formik.getFieldProps('newOrder')}
							type='checkbox'
							value='email'
							className='stngs'
							title='Notification only'
						/>
					</div>
					<div className='my-5'>
						<Radio
							{...formik.getFieldProps('newOrder')}
							type='checkbox'
							className='stngs'
							title='Email and notification'
						/>
					</div>
					<div className='my-5'>
						<Radio
							{...formik.getFieldProps('newOrder')}
							className='stngs'
							title='Off'
							onChange={() => formik.setFieldValue('newOrder', [])}
						/>
					</div>
					<SimpleBtn className='req_change'>Save</SimpleBtn>
				</ToggleDisplay>
			))}
		</div>
	);
};

export default Notification;
