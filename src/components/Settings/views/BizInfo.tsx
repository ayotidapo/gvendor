import EditInputBox from '@/molecules/EditInputBox';
import React from 'react';

const BizInfo = () => {
	return (
		<div>
			<h2 className='h2'>Business Information</h2>
			<EditInputBox title='Business name' />
			<EditInputBox title='Business address' />
			<EditInputBox title='Business email address ' />
			<EditInputBox title='Business phone number' />
			<EditInputBox title='Business category' />
			<EditInputBox title='About business' />
			<EditInputBox title='Business website' />
			<EditInputBox title='Business opening hours ' />
			<EditInputBox title='RC Number' />
			<EditInputBox title='Tax Identification Number' />
			<EditInputBox title='SON Identification Number' />
			<EditInputBox title='Nafdac Number' />
		</div>
	);
};

export default BizInfo;
