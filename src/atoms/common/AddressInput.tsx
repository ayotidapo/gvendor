import Autocomplete from 'react-google-autocomplete';
import { SelectedAddress } from '@/types/types';

const AddressInput = ({
	editAddress,
	index,
	value,
}: {
	editAddress: (address: SelectedAddress, index?: number) => void;
	index?: number;
	value?: string;
}) => {
	return (
		<div
			className={`flex items-center space-x-3 w-full h-14 rounded-md border py-1.5 text-gray-900 border-default-gray shadow-sm text-sm sm:text-base sm:leading-6 resize-none`}
		>
			<Autocomplete
				placeholder='Business address'
				onKeyDown={e => e.stopPropagation()}
				value={value}
				apiKey={'AIzaSyDOWgytq4sghlYgVqrS-ab_SBDUTfB6Tbk'}
				onPlaceSelected={place => {
					const selectedAddress = {
						address: place?.formatted_address || '',
						latitude: place?.geometry?.location?.lat() || 0,
						longitude: place?.geometry?.location?.lng() || 0,
						sourceGooglePlaceID: place?.place_id || '',
					};
					editAddress(selectedAddress, index);
				}}
				debounce={300}
				options={{
					fields: ['geometry.location', 'formatted_address', 'place_id'],
					types: ['address'],
					componentRestrictions: { country: 'ng' },
				}}
				className={`border-transparent w-11/12 placeholder:text-gray-400 focus:ring-0 focus:ring-transparent focus:border-transparent`}
			/>
		</div>
	);
};

export default AddressInput;
