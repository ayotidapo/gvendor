import Radio from '@/atoms/Radio';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import React, { useState } from 'react';

const Notification = () => {
	const [isNonEdit, setIsNonEdit] = useState<boolean>(true);
	return (
		<div className='notification'>
			<h2 className='h2'>Notification Settings</h2>

			<div className='flex justify-between items-center'>
				<h3 className=' subpixel-antialiased'>New order notification</h3>

				<>
					<SimpleBtn
						className='toggle_edit'
						onClick={() => setIsNonEdit(isNonEdit => !isNonEdit)}
					>
						{isNonEdit ? (
							<span className='cursor-pointer ml-1 flex'>
								Change
								<Icon id='edit' width={20} height={20} />
							</span>
						) : (
							<>Cancel</>
						)}
					</SimpleBtn>
				</>
			</div>
			<section>
				<div className='my-5 cursor-pointer'>
					<Radio name='' className='stngs' title='Notification only' />
				</div>
				<div className='my-5'>
					<Radio name='' className='stngs' title='Email and notification' />
				</div>
				<div className='my-5'>
					<Radio name='' className='stngs' title='Off' />
				</div>
			</section>
			{!isNonEdit && <SimpleBtn className='req_change'>Save</SimpleBtn>}
			<hr />
		</div>
	);
};

export default Notification;
