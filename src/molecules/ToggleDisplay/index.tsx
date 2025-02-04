import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import React, { useState } from 'react';
import './td.scss';
interface Props {
	children?: React.ReactNode;
	title?: string;
}
const Notification: React.FC<Props> = ({ children, ...props }) => {
	const [show, setShow] = useState<boolean>(false);
	return (
		<div className='td'>
			<div className='flex justify-between items-center'>
				<h3 className=' subpixel-antialiased text-black'>{props.title}</h3>

				<>
					<SimpleBtn
						className='toggle_edit'
						type='button'
						onClick={() => setShow(show => !show)}
					>
						{show ? (
							<>Cancel</>
						) : (
							<span className='cursor-pointer ml-1 flex'>
								Change
								<Icon id='edit' width={20} height={20} />
							</span>
						)}
					</SimpleBtn>
				</>
			</div>
			{show && <section>{children}</section>}
			<hr className='my-4' />
		</div>
	);
};

export default Notification;
