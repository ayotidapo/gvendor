import { Switch } from '@headlessui/react';

const SwitchComponent = ({
	enabled,
	setEnabled,
}: {
	enabled: boolean;
	setEnabled: (enabled: boolean) => void;
}) => {
	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className='group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none'
		>
			<span className='sr-only'>Use setting</span>
			<span
				aria-hidden='true'
				className='pointer-events-none absolute h-full w-full rounded-md bg-white'
			/>
			<span
				aria-hidden='true'
				className='pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-primary'
			/>
			<span
				aria-hidden='true'
				className='pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5'
			/>
		</Switch>
	);
};

export default SwitchComponent;
