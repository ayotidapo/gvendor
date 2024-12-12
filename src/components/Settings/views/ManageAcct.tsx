'use client';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import EditInputBox, { EditGroupInputBox } from '@/molecules/EditInputBox';
import React, { useState } from 'react';
import DeleteAcct from './DeleteAcct';

const ManageAcct = () => {
	return (
		<div className=''>
			<EditGroupInputBox
				groupTitle='Manage Account'
				actionBtn='Change password'
			>
				{({ isNonEdit }: any) => {
					return (
						<div>
							<EditInputBox title='Change password' nonEditable={isNonEdit} />
							<EditInputBox
								title='Enter new password'
								nonEditable={isNonEdit}
							/>
							<EditInputBox
								title='Re-enter new password'
								nonEditable={isNonEdit}
							/>
						</div>
					);
				}}
			</EditGroupInputBox>
			<hr className='mb-4' />
			<DeleteAcct />
		</div>
	);
};

export default ManageAcct;
