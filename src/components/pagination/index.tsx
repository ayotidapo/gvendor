import React from 'react';

interface PaginationProps {
	currentPage: number;
	totalCount: number;
	itemsPerPage: number;
	pageRangeDisplayed: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalCount,
	itemsPerPage,
	pageRangeDisplayed,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalCount / itemsPerPage);

	const getPageNumbers = (): number[] => {
		if (totalPages > pageRangeDisplayed) {
			const startPage = Math.max(2, currentPage - 2);
			const endPage = Math.min(totalPages - 1, currentPage + 2);

			let pages = [];
			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (startPage > 2) {
				pages = [0, ...pages];
			}
			if (endPage < totalPages - 1) {
				pages = [...pages, 0];
			}

			return [1, ...pages, totalPages];
		}

		return Array.from({ length: totalPages }, (_, i) => i + 1);
	};

	const handlePageChange = (page: number): void => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	};

	const buttonClassName = `
  p-2 flex items-center justify-center
  soft-shrink rounded-[4px]
  bg-off-white
  min-w-[25px] h-[30px]
  border border-transparent
  text-xs
  `;

	return (
		<nav
			className='
      w-full flex items-center
      justify-between overflow-x-scroll
      gap-4
      text-sm text-sec-black
    '
		>
			<span>
				{itemsPerPage * (currentPage - 1) + 1} - {itemsPerPage * currentPage} of{' '}
				{totalCount} entries
			</span>

			<ul
				className='
        flex-1 min-w-max
        flex flex-nowrap
        items-center list-none
        gap-2
        justify-end
        '
			>
				<li
					className={` ${
						currentPage === 1 ? 'opacity-25 cursor-not-allowed' : ''
					}`}
				>
					<button
						onClick={() => {
							handlePageChange(currentPage - 1);
						}}
						className={buttonClassName}
						disabled={currentPage === 1}
					>
						Prev
					</button>
				</li>
				{getPageNumbers().map((number: number, index: number) => (
					<li key={index} className='block !min-w-fit overflow'>
						{typeof number === 'string' ? (
							<span className={buttonClassName}>{number}</span>
						) : (
							<button
								onClick={() => {
									handlePageChange(number);
								}}
								className={`${buttonClassName} ${
									number === currentPage && '!bg-black !font-bold !text-white'
								}`}
							>
								{number}
							</button>
						)}
					</li>
				))}
				<li
					className={` ${
						currentPage === totalPages ? 'opacity-25 cursor-not-allowed' : ''
					}`}
				>
					<button
						onClick={() => {
							handlePageChange(currentPage + 1);
						}}
						className={buttonClassName}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
