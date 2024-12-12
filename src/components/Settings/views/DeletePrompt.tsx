import Checkbox from '@/atoms/Checkbox';
import { SimpleBtn } from '@/atoms/buttons/Button';
import React from 'react';

const DeletePrompt = () => {
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
				<div className='reason'>
					<span>
						I&apos;ve closed my business and no longer need the account.
					</span>
					<Checkbox />
				</div>
				<div className='reason'>
					<span>
						I&apos;ve decided to switch to a different selling platform.
					</span>
					<Checkbox />
				</div>
				<div className='reason'>
					<span>
						i&apos;m shifting to products that don&apos;t align with Good&apos;s
						offerings.
					</span>
					<Checkbox />
				</div>
				<div className='reason'>
					<span>I&apos;m not seeing enough sales activity on Good.</span>
					<Checkbox />
				</div>
				<div className='reason'>
					<span>I find the fees or policies unsuitable for my business.</span>
					<Checkbox />
				</div>
				<div className='reason'>
					<span>
						I need a platform that integrates better with my inventory system.
					</span>
					<Checkbox />
				</div>
				<div className='reason'>
					<span>I prefer not to disclose a reason.</span>
					<Checkbox />
				</div>
			</section>
			<div className='flex '>
				<Checkbox className='agree' />
				<span className=' -translate-y-1'>
					By selecting this checkbox, you agree to permanently delete your
					account and all your data
				</span>
			</div>
			<SimpleBtn className='delete '>Delete account</SimpleBtn>
		</div>
	);
};

export default DeletePrompt;
