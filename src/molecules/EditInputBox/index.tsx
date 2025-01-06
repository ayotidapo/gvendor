'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './edit.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/Input/Input';

interface Props {
	type?: 'text' | 'password' | 'textarea' | 'date';
	value?: string;
	rows?: number;
	textarea?: boolean;
	title?: string;
	nonEditable?: boolean;
}
const EditInputBox: React.FC<Props> = props => {
	const { type, rows, textarea, title, nonEditable, value } = props;
	const non_Editable = nonEditable === undefined ? true : nonEditable;

	const [isNonEdit, setIsNonEdit] = useState<boolean | undefined>(
		nonEditable ?? true
	);
	useEffect(() => {
		setIsNonEdit(non_Editable);
	}, [non_Editable]);

	return (
		<div className='edit_'>
			<div className='flex justify-between items-center'>
				{title && (
					<span className='mb-1 text-black subpixel-antialiased '>
						{title}:
					</span>
				)}

				{false && (
					<>
						<SimpleBtn
							className='toggle_edit'
							onClick={() => setIsNonEdit(isNonEdit => !isNonEdit)}
						>
							{isNonEdit ? (
								<span className='cursor-pointer ml-1 flex'>
									Edit
									<Icon id='edit' width={20} height={20} />
								</span>
							) : (
								<>Cancel</>
							)}
						</SimpleBtn>
					</>
				)}
			</div>
			<Input
				name='details'
				type={type}
				value={value}
				rows={isNonEdit ? 1 : rows}
				className={cx({ non_edit: isNonEdit, textarea })}
				autoFocus={!isNonEdit}
				readOnly={isNonEdit}
			/>

			{!isNonEdit && (
				<SimpleBtn className='req_change'>Request change</SimpleBtn>
			)}
			<hr className='hr' />
		</div>
	);
};

export default EditInputBox;

type RestrictedUser = Omit<Props, 'password' | 'email'>;
interface IProps extends Props {
	children: React.FC;
	groupTitle?: string;
	actionBtn: string;
}
const EditGroupInputBox: React.FC<IProps> = props => {
	const { children, groupTitle, actionBtn } = props;

	const [isNonEdit, setIsNonEdit] = useState<boolean>(true);

	return (
		<div className='multiple_box_div'>
			<div className='flex justify-between items-center mb-10'>
				<h2 className='text-xl text-black   subpixel-antialiased'>
					{groupTitle}
				</h2>
				<SimpleBtn
					className='master_toggle_edit'
					onClick={() => setIsNonEdit(editable => !editable)}
				>
					{isNonEdit ? (
						<span className={`cursor-pointer ml-1 flex`}>
							Edit
							<Icon id='edit' width={20} height={20} />
						</span>
					) : (
						<>Cancel</>
					)}
				</SimpleBtn>
			</div>

			<div>
				{typeof children === 'function'
					? (children as Function)({ isNonEdit })
					: children}
			</div>

			{!isNonEdit && (
				<SimpleBtn className='req_all_change'>{actionBtn}</SimpleBtn>
			)}
		</div>
	);
};

export { EditGroupInputBox };
