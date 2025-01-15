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
	deactivate?: boolean;
	name: string;
	ctaName?: string;
	displayValue?: string | number;
	error?: string;
	cta?: () => void;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	submitting?: boolean;
	children?: React.ReactNode;
}
const EditInputBox: React.FC<Props> = props => {
	const {
		rows,
		textarea,
		submitting,
		ctaName = 'Request change',
		title,
		nonEditable,
		deactivate,
		cta,
		...rest
	} = props;
	const non_Editable = nonEditable === undefined ? true : nonEditable;
	console.log({ rest });
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

				{!deactivate && (
					<>
						<SimpleBtn
							className='toggle_edit'
							type='button'
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
			{props.children ? (
				<div className='my-5'>
					{isNonEdit && <span>{props.displayValue}</span>}
					<div className={isNonEdit ? 'hidden' : 'block  bg-[#fafafa] p-1'}>
						{props.children}
					</div>
				</div>
			) : (
				<Input
					rows={isNonEdit ? 1 : rows}
					className={cx({ non_edit: isNonEdit, textarea })}
					autoFocus={!isNonEdit}
					readOnly={isNonEdit}
					{...rest}
				/>
			)}

			{!isNonEdit && (
				<SimpleBtn className='req_change' disabled={submitting} onClick={cta}>
					{ctaName}
				</SimpleBtn>
			)}
			<hr className='hr' />
		</div>
	);
};

export default EditInputBox;

type RestrictedUser = Omit<Props, 'password' | 'email'>;
interface IProps {
	children: React.FC;
	groupTitle?: string;
	actionBtn: string;
	isLoading?: boolean;
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
					type='button'
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
				<SimpleBtn className='req_all_change' disabled={props.isLoading}>
					{actionBtn}
				</SimpleBtn>
			)}
		</div>
	);
};

export { EditGroupInputBox };
