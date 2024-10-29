'use client';

import TextInput from '@/components/input/TextInput';
import {
	useUpdateAccountMutation,
	useGetBankQuery,
	useGetAccountQuery,
} from '@/redux/miscellaneous/getbank.slice';
import { Bank } from '@/redux/miscellaneous/getbank.type';
import Select from '@/components/select/Select';

import React, { useEffect, useState } from 'react';
import Button from '@/components/buttons/Button';
import { useRouter } from 'next/navigation';

const Account = () => {
	const [updateAccount] = useUpdateAccountMutation();
	const { data: bankData } = useGetBankQuery();
	const [accountData, setAccountData] = useState<{
		accountNumber: string;
		bankCode: string;
		bankName: string;
	}>({
		accountNumber: '',
		bankCode: '',
		bankName: '',
	});
	const { data: account, refetch: refetchAccount } = useGetAccountQuery(
		{
			bankCode: accountData.bankCode,
			accountNumber: accountData.accountNumber,
		},
		{
			skip:
				!accountData.bankCode ||
				!accountData.accountNumber ||
				accountData.accountNumber.length < 10,
		}
	);
	const router = useRouter();

	const formattedBankOptions = bankData?.data
		? bankData?.data?.map((bank: Bank) => ({
				label: bank.name,
				value: bank.code,
			}))
		: [];

	useEffect(() => {
		if (accountData.accountNumber.length === 10 && accountData.bankCode) {
			refetchAccount();
		}
	}, [accountData.accountNumber, accountData.bankCode]);

	const handleUpdateAccount = async () => {
		if (accountData) {
			const res = await updateAccount(accountData);
			if (res.data) {
				router.push('/');
			}
		}
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleUpdateAccount();
			}}
		>
			<div className='flex flex-col space-y-4'>
				<Select
					options={formattedBankOptions}
					placeholder='Bank'
					value={accountData?.bankCode || ''}
					onChange={value => {
						setAccountData(prevAccountData => ({
							...prevAccountData,
							bankCode: value as string,
							bankName: bankData?.data?.find(bank => bank.code === value)
								?.name as string,
							accountNumber: prevAccountData?.accountNumber || '',
						}));
					}}
				/>
				<TextInput
					type={'text'}
					name='accountNumber'
					value={accountData?.accountNumber}
					onChange={e => {
						setAccountData(prevAccountData => ({
							...prevAccountData,
							accountNumber: e.target.value,
						}));
					}}
					placeholder='Account number'
				/>
				<TextInput
					type={'text'}
					name='accountName'
					value={account?.account_name ?? ''}
					onChange={() => {}}
					disabled
					placeholder='Account name'
				/>
			</div>

			<div className='mt-6 w-[183px]'>
				<Button
					disabled={!account?.account_name}
					label={'Add account'}
					type='submit'
				/>
			</div>
		</form>
	);
};

export default Account;
