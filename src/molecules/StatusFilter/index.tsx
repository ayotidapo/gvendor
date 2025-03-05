import DropDown from '@/atoms/DropDown';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import React from 'react';
import './statusfilter.scss';

interface Props {
	onSetStatus: (status: string) => void;
	status: string;
	states: { name: string; value: string }[];
}
const StatusFilter: React.FC<Props> = ({ onSetStatus, status, states }) => {
	return (
		<DropDown
			className='status__filter'
			component={
				<span className='border-2 inline-flex h-[50px] items-center p-5 border-black rounded-md'>
					<Icon id='sortp' className='mr-2' />
					Sort by: <span className='capitalize'>&nbsp;{status || 'ALL'}</span>
				</span>
			}
		>
			<div className='w-[220px] flex flex-col p-4 gap-4 text-left'>
				{states.map(({ name, value }, i) => (
					<span role='button' onClick={() => onSetStatus(value)} key={i}>
						{name}
					</span>
				))}
			</div>
		</DropDown>
	);
};

export default StatusFilter;
