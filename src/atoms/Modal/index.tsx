import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './modal.scss';

interface Props {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
	bodyClose?: boolean;
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
				{false && <div className='close_icon'>&times;</div>}

				<div>{children}</div>
			</section>
		</div>
	);
};

export default Modal;
