import DropDown from '@/atoms/DropDown';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import React from 'react';

interface Props {
	onSetStatus: (status: string) => void;
	status: string;
	states: { name: string; value: string }[];
}
const StatusFilter: React.FC<Props> = ({ onSetStatus, status, states }) => {
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
					{states.map(({ name, value }, i) => (
						<span role='button' onClick={() => onSetStatus(value)} key={i}>
							{name}
						</span>
					))}
				</div>
			</DropDown>
		</SimpleBtn>
	);
};

export default StatusFilter;
