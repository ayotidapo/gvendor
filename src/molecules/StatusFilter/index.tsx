import DropDown from '@/atoms/DropDown';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import React from 'react';

interface Props {
	onSetStatus: (status: string) => void;
	status: string;
}
const StatusFilter: React.FC<Props> = ({ onSetStatus, status }) => {
	return (
		<SimpleBtn className='filter'>
			<Icon id='sortp' className='mr-2' />
			<DropDown
				component={
					<span>
						Sort by: <span className='capitalize'>{status || 'ALL'}</span>
					</span>
				}
			>
				<div className='w-[220px] flex flex-col p-4 gap-4 text-left'>
					<span onClick={() => onSetStatus('')}>All</span>
					<span role='button' onClick={() => onSetStatus('NEW')}>
						New
					</span>
					<span role='button' onClick={() => onSetStatus('ONGOING')}>
						Processing
					</span>
					<span role='button' onClick={() => onSetStatus('FULFILLED')}>
						Completed
					</span>
				</div>
			</DropDown>
		</SimpleBtn>
	);
};

export default StatusFilter;
