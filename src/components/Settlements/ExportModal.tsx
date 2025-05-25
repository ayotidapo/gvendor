import Radio from '@/atoms/Radio';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { useFormikContext } from 'formik';
import React from 'react';

interface Props {
	exporting?: boolean;
	onProceed: () => void;
}

const ExportModal: React.FC<Props> = props => {
	const { values } = useFormikContext();
	const { onProceed, exporting } = props;
	return (
		<div className='download__box'>
			<h2 className='headings'>Export</h2>

			<div>
				<Radio name='export' value='email' formik /> Send to Email
			</div>
			<div>
				<Radio name='export' value='download' formik /> Download as Excel
			</div>
			<SimpleBtn
				className='proceed'
				type='button'
				disabled={exporting}
				onClick={onProceed}
			>
				{exporting ? <em>Processing...</em> : `Proceed`}
			</SimpleBtn>
		</div>
	);
};

export default ExportModal;
