import React, { useState } from 'react';
import cx from 'classnames';
import './edit.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/input/Input';

interface Props {
	type?: 'text' | 'password' | 'textarea' | 'date';
	rows?: number;
	textarea?: boolean;
	title: string;
}
const EditInputBox: React.FC<Props> = props => {
	const { type, rows, textarea, title } = props;
	const [isEdit, setIsEdit] = useState<boolean>(false);
	return (
		<div className='edit_'>
			<div className='flex justify-between items-center'>
				<span className='mb-1 text-black subpixel-antialiased '>{title}:</span>

				<SimpleBtn
					className='toggle_edit'
					onClick={() => setIsEdit(isEdit => !isEdit)}
				>
					{isEdit ? (
						<>Cancel</>
					) : (
						<span className='cursor-pointer ml-1 flex'>
							Edit
							<Icon id='edit' width={20} height={20} />
						</span>
					)}
				</SimpleBtn>
			</div>
			<Input
				name='search'
				type={type}
				rows={!isEdit ? 1 : rows}
				value='Jollof Rice and 6 Chicken Wings'
				className={cx({ edit: !isEdit, textarea })}
				autoFocus={isEdit}
				readOnly={!isEdit}
			/>

			{isEdit && <SimpleBtn className='req_change'>Request change</SimpleBtn>}
			<hr className='border-divider-gray border-[0.5px]' />
		</div>
	);
};

export default EditInputBox;
