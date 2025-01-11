import Input from '@/atoms/Input';
import Radio from '@/atoms/Radio';
import { ErrorMessage, useFormikContext } from 'formik';

import React from 'react';

interface IProps {
	fName: string;
	title?: string;
	rName: string;
}
const DialogRadio: React.FC<IProps> = props => {
	const { values } = useFormikContext<Record<string, any>>();
	const { rName, fName } = props;
	console.log(values);
	const validate = (value: string) => {
		let error;

		if (!value) {
			error = 'select an option';
		}

		return error;
	};

	return (
		<>
			<h3 className='h3 my-5'>{props.title}</h3>
			<ErrorMessage name={rName} component='div' className='error' />
			<label className='block my-3.5'>
				<Radio name={rName} value='y' validate={validate} formik />
				Yes
			</label>

			<label className='block  my-3.5'>
				<Radio name={rName} value='n' validate={validate} formik />
				No
			</label>
			{values[rName] === 'y' && <Input name={fName} />}
		</>
	);
};

export default DialogRadio;
