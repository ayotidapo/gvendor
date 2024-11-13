'use client';

import React, { ReactNode } from 'react';
import Spinner from '../spinner/Spinner';
import Pagination from '../pagination';
import { EmptyState } from '../emptyState/emptyState';

const NUMBER_OF_ITEMS_PER_PAGE = 20;

export const TableComponent: React.FC<{
	headers: ReactNode[] | string[];
	rows: Array<{ id: number | string; content: ReactNode[] | string[] }>;
	name?: string;
	showName?: boolean;
	isRowClickable?: boolean;
	onRowClick?: (idx: number | string) => void;
	loading?: boolean;
	isEmpty?: boolean;
	emptyText?: string;
	currentPage?: number;
	totalDataCount?: number;
	pageLimit?: number;
	pageRangeDisplayed?: number;
	onPageChange?: (pageNo: number) => void;
	fixedTableWidth?: boolean;
}> = ({
	headers,
	rows,
	name = '',
	showName = false,
	isRowClickable = false,
	onRowClick = () => {},
	loading = false,
	isEmpty = false,
	emptyText = 'Nothing to see here',
	currentPage,
	totalDataCount,
	pageLimit,
	pageRangeDisplayed = 3,
	onPageChange = () => {},
	fixedTableWidth = false,
}) => {
	return loading ? (
		<div
			className='
      flex items-center justify-center
    '
		>
			<Spinner fullScreen={false} />
		</div>
	) : (
		<div className=''>
			{!isEmpty ? (
				<div
					className='
            w-full min-h-full
            flex flex-col gap-6
            justify-between
            border-divider-gray
            overflow-y-visible
        '
				>
					{showName && <span className='text-xl font-semibold'>{name}</span>}

					<div
						className='
            overflow-x-scroll
            overflow-y-visble
            '
					>
						<table
							className={`
            min-w-full max-w-full
            ${fixedTableWidth && '!table-fixed w-full'}
            `}
						>
							<thead>
								<tr>
									{headers.map((header, idx) => {
										const key = `table-${name}-header${idx}`;

										return (
											<th
												scope='col'
												className='
                        px-3 py-3.5
                        first:pl-4 first:pr-3 first:sm:pl-3
                        last:pl-3 last:pr-4 last:sm:pr-3
                        text-left text-sm text-black
                        border-b border-divider-gray
                        bg-[#F6F6F6]
                        uppercase font-normal
                        '
												key={key}
											>
												{header}
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody className=' '>
								{rows?.map(({ id, content }) => {
									return (
										<tr
											key={id}
											className={`
                      border-spacing-y-80
                      group
                      ${
												isRowClickable &&
												`cursor-pointer
                        md:hover:scale-[0.99]
                        transition-all duration-300
                        `
											}
                        `}
											onClick={() => {
												if (isRowClickable) {
													onRowClick(id);
												}
											}}
										>
											{content.map((content, idx) => {
												const key = `table-row-${id}-cell-${idx}`;
												return (
													<td
														className={`
                            px-3 py-4
                            first:pl-4 first:pr-3 first:sm:pl-3
                            last:pl-3 last:pr-4 last:sm:pr-3
                            border-b
                            border-divider-gray
                            whitespace-nowrap text-sm
                            font-normal text-sec-black
                            transition-all duration-300
                            overflow-visible
                        `}
														key={key}
													>
														{content}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					{totalDataCount && pageLimit && totalDataCount / pageLimit > 1 ? (
						<Pagination
							currentPage={currentPage ?? 0}
							totalCount={totalDataCount ?? 0}
							itemsPerPage={pageLimit ?? NUMBER_OF_ITEMS_PER_PAGE}
							pageRangeDisplayed={pageRangeDisplayed}
							onPageChange={onPageChange}
						/>
					) : undefined}
				</div>
			) : (
				<EmptyState text={emptyText} />
			)}
		</div>
	);
};
