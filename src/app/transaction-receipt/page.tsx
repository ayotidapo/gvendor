import Button from '@/components/buttons/Button';
import { Status } from '@/components/cards/StatusTag';
import { GoodLogo } from '@/components/svg/svg';
import { Header } from '@/components/typography/Header';
import PageWrapper from '@/containers/PageWrapper';
import { formatCurrency } from '@/helpers';

const TransactionReceipt = () => {
	return (
		<PageWrapper pageHeader=''>
			<div className='pb-10'>
				<div className='flex items-center space-x-20 justify-start pb-6 gap-10'>
					<GoodLogo fill={'#F45D2C'} />
					<Header header={'Transactions Receipt'} />
				</div>
			</div>
			<div className='bg-[#F6F6F6] border border-[#EAEAEA] shadow-sm p-4 rounded-md'>
				<div className='flex items-center justify-start p-2 gap-6'>
					<div>Transaction Date:</div>
					<div>Wednesday,June 18, 2024</div>
				</div>
			</div>
			<div className='p-6'>
				<Header header={'Transaction Details'} />
			</div>
			<hr />
			<div className='p-10'>
				<div className='flex items-center justify-between'>
					<div className='space-y-2'>
						<label className='text-xl'>Amount</label>
						<p className='text-[#050301]'> ₦98,560.00</p>
					</div>
					<div>
						<Status type={'success'} text={'paid'} />
					</div>
				</div>
				<hr />
				<div className='space-y-5 pt-6 pb-10'>
					<div className='flex justify-between'>
						Reference
						<span className='text-secondary-black'>
							hsnxibos-nj cn skjbsah x-sgeyoab
						</span>
					</div>
					<div className='flex justify-between'>
						Fees
						<span className='text-secondary-black'>{formatCurrency(400)}</span>
					</div>
					<div className='flex justify-between'>
						Amount Paid
						<span className='text-secondary-black'>
							{formatCurrency(98000)}
						</span>
					</div>
				</div>
				<div>
					<Header className='pb-4' header={'Bank Details'} />
					<hr />

					<div className='space-y-5 pt-6 pb-10'>
						<div className='flex justify-between'>
							Account Name
							<span className='text-secondary-black'>
								Amos Edos Osamudiamen
							</span>
						</div>
						<div className='flex justify-between'>
							Bank
							<span className='text-secondary-black'>
								First Bank of Nigeria
							</span>
						</div>
						<div className='flex justify-between'>
							Account Number
							<span className='text-secondary-black'>0001112278</span>
						</div>
					</div>
				</div>
				<div className='flex justify-center items-center'>
					<div className='w-[190px]'>
						<Button label={'Download PDF'} />
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default TransactionReceipt;
