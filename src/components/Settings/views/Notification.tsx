import Radio from '@/atoms/Radio';
import { SimpleBtn } from '@/atoms/buttons/Button';
import ToggleDisplay from '@/molecules/ToggleDisplay';
import { updateNotifSettingsApi } from '@/redux/apis/notifications';
import { useSelector } from '@/redux/hooks';
import { ObjectData } from '@/utils/interface';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
interface Props {
	children?: React.ReactNode;
}

const settingsD = [
	{ title: 'New order notification', name: 'newOrder' },
	{ title: 'Settlement and withdrawal', name: 'settlementAndWithdrawal' },
	{ title: 'Low stock alerts', name: 'lowStockAlerts' },
	{ title: 'Sign in activity', name: 'signInActivity' },
];
const Notification: React.FC<Props> = ({ children }) => {
	const notifSettings = useSelector(state => state.notifSettings);
	const [loading, setLoading] = useState<boolean>(false);

	const { newOrder, settlementAndWithdrawal, lowStockAlerts, signInActivity } =
		notifSettings;

	const formik = useFormik({
		initialValues: {
			newOrder: {
				email: newOrder?.email,
				pushNotification: newOrder?.pushNotification,
				selected: [
					newOrder?.email ? 'email' : '',
					newOrder?.pushNotification ? 'pushNotification' : '',
				],
			},
			settlementAndWithdrawal: {
				email: settlementAndWithdrawal?.email,
				pushNotification: settlementAndWithdrawal?.pushNotification,
				selected: [
					settlementAndWithdrawal?.email ? 'email' : '',
					settlementAndWithdrawal?.pushNotification ? 'pushNotification' : '',
				],
			},
			lowStockAlerts: {
				email: lowStockAlerts?.email,
				pushNotification: lowStockAlerts?.pushNotification,
				selected: [
					lowStockAlerts?.email ? 'email' : '',
					lowStockAlerts?.pushNotification ? 'pushNotification' : '',
				],
			},
			signInActivity: {
				email: signInActivity?.email,
				pushNotification: signInActivity?.pushNotification,
				selected: [
					signInActivity?.email ? 'email' : '',
					signInActivity?.pushNotification ? 'pushNotification' : '',
				],
			},
		},
		onSubmit: values => {
			const Values: ObjectData = values;
			const payload = Object.keys(Values).reduce((acc, cur, i) => {
				return {
					...acc,
					[cur]: {
						email: Values[cur]?.email,
						pushNotification: Values[cur]?.pushNotification,
					},
				};
			}, {});
			onUpdateNotifSettings(payload);
		},
		enableReinitialize: true,
	});

	const values: ObjectData = formik?.values;

	const onUpdateNotifSettings = async (body: ObjectData) => {
		try {
			setLoading(true);
			await updateNotifSettingsApi(body);
			toast.success(`Settings update succesfully`);
		} catch (e: any) {
			toast.error(`Error: ${e.message}`);
		} finally {
			setLoading(false);
		}
	};

	const onSetNotification = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e?.target;
		if (value === '') {
			formik.setFieldValue(`${name}.email`, false);
			formik.setFieldValue(`${name}.pushNotification`, false);
			formik.setFieldValue(`${name}.selected`, []);
		} else if (checked) {
			formik.setFieldValue(`${name}.${value}`, true);
			formik.setFieldValue(`${name}.selected`, [
				...values[name]?.selected,
				value,
			]);
		} else {
			formik.setFieldValue(`${name}.${value}`, false);
			const newSelected = values[name].selected?.filter(
				(selection: string) => selection !== value
			);
			formik.setFieldValue(`${name}.selected`, [...newSelected]);
		}
	};

	console.log({ values });
	return (
		<form className='notification' onSubmit={formik.handleSubmit}>
			<h2 className='h2'>Notification Settings</h2>
			{settingsD?.map(setting => (
				<ToggleDisplay title={setting?.title} key={setting.title}>
					<div className='my-5 cursor-pointer'>
						<Radio
							{...formik.getFieldProps(setting.name)}
							value='email'
							className='stngs'
							type='checkbox'
							title='Notification only'
							onChange={onSetNotification}
							checked={values[setting?.name]?.selected.includes('email')}
						/>
					</div>
					<div className='my-5'>
						<Radio
							{...formik.getFieldProps(setting.name)}
							value='pushNotification'
							className='stngs'
							type='checkbox'
							title='Email and notification'
							onChange={onSetNotification}
							checked={values[setting?.name]?.selected.includes(
								'pushNotification'
							)}
						/>
					</div>
					<div className='my-5'>
						<Radio
							{...formik.getFieldProps(setting.name)}
							className='stngs'
							type='checkbox'
							value=''
							title='Off'
							onChange={onSetNotification}
							checked={values[setting?.name]?.selected?.length < 1}
						/>
					</div>
					<SimpleBtn className='req_change' disabled={loading}>
						Save
					</SimpleBtn>
				</ToggleDisplay>
			))}
		</form>
	);
};

export default Notification;
