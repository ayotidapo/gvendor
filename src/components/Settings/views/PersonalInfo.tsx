import EditInputBox from '@/molecules/EditInputBox';
import React from 'react';

const PersonalInfo = () => {
	return (
		<div>
			<h2 className='h2'>Personal Information</h2>
			<EditInputBox title='First name' />
			<EditInputBox title='Last name' />
			<EditInputBox title='Email address ' />
			<EditInputBox title='Phone number' />
		</div>
	);
};

export default PersonalInfo;
