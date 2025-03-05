import { ErrorMessage, Field, FieldProps } from 'formik';
import PhoneInput from 'react-phone-number-input';
import './phone-input.scss';

interface IPProps extends FieldProps {
	onChange: () => void;
	onBlur: (e: any) => void;
	placeholder?: string;
	className?: string;
	noEdit?: boolean;
	// error?: string;
}

const InputPhone: React.FC<IPProps> = ({
	field: { name, value },
	form: { errors, touched },
	onChange,
	onBlur,
	...props
}) => {
	return (
		<div className={`ph_div ${errors[name] && touched[name] ? 'error_' : ''}`}>
			<PhoneInput
				defaultCountry='NG'
				value={value}
				name={name} // not really neccessary here tho
				onChange={onChange}
				onBlur={onBlur}
				international
				{...props}
				readOnly={props.noEdit}
			/>
			<ErrorMessage name={name} component='div' className='error' />
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
	noEdit?: boolean;
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
