import { ErrorMessage, Field, FieldProps } from 'formik';
import PhoneInput from 'react-phone-number-input';
import './phone-input.scss';

interface IPProps extends FieldProps {
	onChange: () => void;
	onBlur: (e: any) => void;
	placeholder?: string;
	className?: string;
	// error?: string;
}

const InputPhone: React.FC<IPProps> = ({
	field,
	form: { errors },

	onChange,
	onBlur,
	...props
}) => {
	return (
		<div className={`ph_div ${errors[field?.name] ? 'error_' : ''}`}>
			<PhoneInput
				defaultCountry='NG'
				value={field.value}
				name={field.name} // not really neccessary here tho
				onChange={onChange}
				onBlur={onBlur}
				international
				{...props}
			/>
			<ErrorMessage name={field.name} component='div' className='error' />
		</div>
	);
};

type PFProps = {
	className?: string;
	defaultCountry?: string;
	name: string;
	onChange: (val: any) => void;
	onBlur: (e: React.FocusEvent<HTMLElement, Element>) => void;
	placeholder?: string;
	// error?: string;
};

const PhoneField: React.FC<PFProps> = ({
	onChange,
	defaultCountry,
	...rest
}) => {
	return (
		<Field
			component={InputPhone}
			defaultCountry={defaultCountry}
			onChange={(val: any) => onChange(val)}
			{...rest}
		/>
	);
};

export { PhoneField };
