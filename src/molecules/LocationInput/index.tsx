import { ObjectData } from '@/utils/interface';
import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import './location.scss';
import { useFormikContext } from 'formik';

interface Props {
	onSelectLocation: (address: ObjectData) => void;
	error?: string;
}
const LocationInput: React.FC<Props> = ({ onSelectLocation, error }) => {
	const { setErrors } = useFormikContext();

	return (
		<div className='location'>
			<div className='input_wrapper'>
				<Autocomplete
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API}
					onPlaceSelected={place => {
						setErrors({ businessAddress: '' });
						const addressComponents = place?.address_components;
						const extraInfo: Record<string, any> = {
							addressType: '',
							additionalDetails: '',
							suiteOrFloorNumber: '',
							buildingNumber: '',
							buildingName: '',
						};
						addressComponents?.forEach((component: Record<string, any>) => {
							const types = component?.types;

							if (types.includes('premise')) {
								extraInfo.buildingName = component?.long_name;
							}
							if (types.includes('street_number')) {
								extraInfo.buildingNumber = component?.long_name;
							}
							if (types.includes('subpremise')) {
								extraInfo.suiteOrFloorNumber = component?.long_name;
							}
							if (types.includes('route')) {
								extraInfo.additionalDetails = component?.long_name;
							}
							if (types.includes('locality')) {
								extraInfo.addressType = component?.long_name;
							}
						});

						const selectedAddress = {
							address: place?.formatted_address || '',
							latitude: place?.geometry?.location?.lat() || 0,
							longitude: place?.geometry?.location?.lng() || 0,
							// sourceGooglePlaceID: place?.place_id || '',
							// ...extraInfo,
						};

						onSelectLocation(selectedAddress);
					}}
					className={`input ${error ? 'error' : ''}`}
					options={{
						fields: [
							'geometry.location',
							'formatted_address',
							'place_id',
							'address_components',
						],
						types: ['address'],
						componentRestrictions: { country: 'ng' },
					}}
				/>
			</div>
		</div>
	);
};

export default LocationInput;
