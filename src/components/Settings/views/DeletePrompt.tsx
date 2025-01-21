import Checkbox from '@/atoms/Checkbox';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Fetch from '@/utils/fetch';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const vendorReasons = [
	"I've closed my business and no longer need the account.",
	"I've decided to switch to a different selling platform.",
	"I'm shifting to products that don't align with Good's offerings.",
	"I'm not seeing enough sales activity on Good.",
	'I find the fees or policies unsuitable for my business.',
	'I need a platform that integrates better with my inventory system.',
	'I prefer not to disclose a reason.',
];

const DeletePrompt = () => {
	const router = useRouter();
	const [isEnable, setIsEnable] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [reasons, setReasons] = useState<string[]>([]);
	const onReason = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, name, value } = e?.target;
		if (checked) setReasons([...reasons, value]);
		else setReasons([...reasons.filter(reason => reason !== value)]);
	};

	const onDelete = async () => {
		try {
			setDeleting(true);
			await Fetch(`profile/delete`, {
				method: 'post',
				body: { reason: reasons[0] },
			});
			toast.success(`Account deleted`);
			router.replace(`/auth-validate`);
		} catch {
			toast.error(`Could not delete account`);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className='delete-prompt'>
			<h2 className='h2 text-black subpixel-antialiased'>Manage Account</h2>
			<h3 className='text-black subpixel-antialiased mb-3'>Delete account</h3>
			<p className='font-[400]'>
				Please note that deleting your creator account is a permanent action.
				Once your account is deleted, it will no longer be accessible and cannot
				be restored. If you decide later to sell on Good again or to use our
				products and services that require a creator account, you will need to
				create a new account.
			</p>
			<p className='text-black subpixel-antialiased my-5'>
				Please select the reason for closing your Good creator account{' '}
			</p>
			<section>
				{vendorReasons.map(reason => (
					<div className='reason' key={reason}>
						<span>{reason}</span>
						<Checkbox
							name='reasons'
							value={reason}
							onChange={onReason}
							checked={reasons.includes(reason)}
						/>
					</div>
				))}
			</section>
			<div className='flex '>
				<Checkbox
					className='agree'
					name=''
					value=''
					onChange={e => {
						setIsEnable(x => !x);
					}}
				/>
				<span className=' -translate-y-1'>
					By selecting this checkbox, you agree to permanently delete your
					account and all your data
				</span>
			</div>
			<SimpleBtn
				className='delete '
				disabled={!isEnable || reasons?.length < 1}
				onClick={onDelete}
			>
				Delete account
			</SimpleBtn>
		</div>
	);
};

export default DeletePrompt;
