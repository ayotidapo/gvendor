import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

interface Props {
	onChange: (value: string | null) => void;
	name: string;
	value: string | null;
}
const TimeInput: React.FC<Props> = props => {
	const { name, ...rest } = props;
	return (
		<>
			<Field name={name}>
				{({ field }: FieldProps) => (
					<TimePicker {...rest} disableClock className='time_input_wrapper' />
				)}
			</Field>
			<ErrorMessage name={name} component='div' className='error' />
		</>
	);
};

export default TimeInput;
