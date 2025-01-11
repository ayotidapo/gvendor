'use client';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import EditInputBox, { EditGroupInputBox } from '@/molecules/EditInputBox';
import React, { useState } from 'react';

const BankAcct = () => {
	return (
		<div className=''>
			<EditGroupInputBox groupTitle='Settlement Bank Account' actionBtn=''>
				{({ isNonEdit }: any) => {
					return (
						<div>
							<EditInputBox
								name=''
								title='Account number'
								nonEditable={isNonEdit}
							/>
							<EditInputBox name='' title='Bank name' nonEditable={isNonEdit} />
							<EditInputBox
								name=''
								title='Account name'
								nonEditable={isNonEdit}
							/>
						</div>
					);
				}}
			</EditGroupInputBox>
		</div>
	);
};

export default BankAcct;
