import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './modal.scss';

interface Props {
	children: React.ReactNode;
	open?: boolean;
	onClose?: () => void;
}

const Modal: React.FC<Props> = props => {
	const { children, open, onClose } = props;
	const [isOpen, setIsOpen] = useState(open);

	useEffect(() => {
		setIsOpen(isOpen);
		onClose?.();
	}, [isOpen]);

	return (
		<div className={cx(`modal`, { open: isOpen })}>
			<section
				className={cx(`modal_content `, { open })}
				onClick={() => setIsOpen(false)}
			>
				<div className='close_icon'>&times;</div>

				<div>{children}</div>
			</section>
		</div>
	);
};

export default Modal;
