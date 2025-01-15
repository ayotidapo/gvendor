'use client';
import Select from '@/atoms/Select';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import Spinner from '@/atoms/spinner/Spinner';
import EditInputBox, { EditGroupInputBox } from '@/molecules/EditInputBox';
import { validationSchema } from '@/onboard/BusinessSetup/views/BankDetails';
import { updateBankAccountApi } from '@/redux/apis/business';
import { getAllBanks } from '@/redux/apis/settlements';
import { useSelector } from '@/redux/hooks';
import Fetch from '@/utils/fetch';
import { ObjectData } from '@/utils/interface';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BankAcct = () => {
	const { settlementAccount } = useSelector(state => state.vendor);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [banks, setBanks] = useState([]);
	const { values, setFieldValue, setFieldError, errors, ...formik } = useFormik(
		{
			initialValues: {
				accountNumber: settlementAccount?.accountNumber || '',
				bankCode: settlementAccount?.bankCode || '',
				accountName: settlementAccount?.bankName || '',
			},
			onSubmit: async values => {
				try {
					setIsLoading(true);
					await updateBankAccountApi(values);
					toast.success(`Account details successfully updated!`);
				} catch (e: any) {
					toast.error(`Error:${e?.message}`);
				} finally {
					setIsLoading(false);
				}
			},
			validationSchema: validationSchema,
		}
	);

	const getBankDetails = async () => {
		const { bankCode, accountNumber } = values;

		try {
			setLoading(true);
			setFieldError('accountName', '');
			const response = await Fetch(
				`/vendor/account-name?bankCode=${bankCode}&accountNumber=${accountNumber}`
			);
			setFieldValue('accountName', response?.data);
		} catch (e) {
			setFieldError('accountName', 'account name not found');
		} finally {
			setLoading(false);
		}
	};
	console.log({ errors }, 'pos');
	const getBanks = async () => {
		try {
			const banks = await getAllBanks();
			setBanks(banks);
		} catch (e) {
			toast.error(`could not fetch all banks`);
		}
	};
	useEffect(() => {
		getBanks();
	}, []);

	useEffect(() => {
		setFieldValue('accountName', '');

		if (values?.accountNumber?.length === 10) {
			getBankDetails();
		}
	}, [values?.accountNumber, values?.bankCode]);

	return (
		<form className='bank_acct' onSubmit={formik.handleSubmit}>
			<EditGroupInputBox
				groupTitle='Settlement Bank Account'
				actionBtn='Request Change'
				isLoading={isLoading}
			>
				{({ isNonEdit }: any) => {
					return (
						<div>
							<EditInputBox
								title='Account number'
								nonEditable={isNonEdit}
								{...formik.getFieldProps('accountNumber')}
								error={errors?.accountNumber as string}
							/>
							<EditInputBox
								title='Bank name'
								name='bankName'
								nonEditable={isNonEdit}
								displayValue={
									(
										banks?.find(
											(bank: ObjectData) => bank?.value === values?.bankCode
										) as any
									)?.label
								}
							>
								<Select
									{...formik.getFieldProps('bankCode')}
									options={banks}
									value={values?.bankCode}
								/>
							</EditInputBox>

							<EditInputBox
								title={loading ? 'loading account name...' : 'Account name'}
								{...formik.getFieldProps('accountName')}
								nonEditable={isNonEdit}
								error={errors?.accountName as string}
								onChange={() => {}}
							/>
						</div>
					);
				}}
			</EditGroupInputBox>
		</form>
	);
};

export default BankAcct;
