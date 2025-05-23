import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './modal.scss';
import { Icon } from '../icon/icon';

interface Props {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
	bodyClose?: boolean;
	iconClose?: boolean;
}

const Modal: React.FC<Props> = props => {
	const { children, open, onClose, bodyClose } = props;

	const onBodyClose = () => {
		if (!bodyClose) return;
		props.onClose();
	};

	return (
		<div className={cx(`modal`, { open })}>
			<section className={cx(`modal_content `, { open })} onClick={onBodyClose}>
				{props.iconClose && (
					<Icon
						id='close'
						width={32}
						height={32}
						className='cursor-pointer close-x'
						onClick={onClose}
					/>
				)}

				{children}
			</section>
		</div>
	);
};

export default Modal;
