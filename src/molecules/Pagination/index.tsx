import React from 'react';
import ReactPaginate from 'react-paginate';
import './paginate.scss';

interface Props {
	onPageChange: (page: { selected: number }) => void;
	curItemsLen: number;
	page: number;
	limit?: number;
	totalItems: number;
}
const Pagination: React.FC<Props> = props => {
	const { page, limit = 10, totalItems, curItemsLen } = props;
	const pageCount = Math.ceil(totalItems / limit);
	const isCurItemComplete = curItemsLen === limit;

	return (
		<div className='pagination__div '>
			<ReactPaginate
				breakLabel='...'
				onPageChange={props.onPageChange}
				initialPage={props.page - 1}
				pageRangeDisplayed={1}
				pageCount={pageCount}
				activeClassName='bg-black text-white'
				nextLabel='>'
				previousLabel='<'
				disabledClassName='cursor-not-allowed opacity-0'
				nextLinkClassName=''
			/>
			<div className='text-center font-geist text-sm my-2.5 mb-5'>
				{`${isCurItemComplete ? (page - 1) * curItemsLen + 1 : totalItems - curItemsLen + 1} - ${isCurItemComplete ? page * curItemsLen : totalItems} of ${totalItems} items`}
			</div>
		</div>
	);
};

export default Pagination;
