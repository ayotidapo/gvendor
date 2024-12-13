import { ErrorMessage, Field, FieldProps } from 'formik';
import PhoneInput from 'react-phone-number-input';
import './phone-input.scss';

interface IPProps extends FieldProps {
	onChange: () => void;
	onBlur: (e: any) => void;
	placeholder?: string;
	className?: string;
	error?: string;
}

const InputPhone: React.FC<IPProps> = ({
	field,
	form,
	error,
	onChange,
	onBlur,
	...props
}) => {
	return (
		<div className={`ph_div ${error ? 'error_' : ''}`}>
			<PhoneInput
				defaultCountry='NG'
				value={field.value}
				name={field.name}
				onChange={onChange}
				onBlur={onBlur}
				international
				{...props}
			/>
			<ErrorMessage name={field.name} component='div' className='error' />
		</div>
	);
};

type PFProps = FieldProps['field'] & {
	className?: string;
	defaultCountry?: string;
	onChange: (val: any) => void;
	onBlur: (e: React.FocusEvent<HTMLElement, Element>) => void;
	placeholder?: string;
	error?: string;
};

const PhoneField: React.FC<PFProps> = ({ onChange, value, ...rest }) => {
	return (
		<Field
			component={InputPhone}
			onChange={(val: any) => onChange(val)}
			value={value}
			{...rest}
		/>
	);
};

export { PhoneField };
