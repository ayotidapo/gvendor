'use client'
import React, { ReactNode } from 'react'
import Spinner from '../spinner/Spinner'
import Pagination from '../pagination'

const NUMBER_OF_ITEMS_PER_PAGE = 20

export const TableComponent: React.FC<{
  headers: ReactNode[] | string[]
  rows: Array<{ id: number | string; content: ReactNode[] | string[] }>
  name?: string
  isRowClickable?: boolean
  onRowClick?: (idx: number | string) => void
  loading?: boolean
  isEmpty?: boolean
  emptyText?: string
  currentPage?: number
  totalDataCount?: number
  pageLimit?: number
  pageRangeDisplayed?: number
  onPageChage?: (pageNo: number) => void
  fixedTableWidth?: boolean
}> = ({
  headers,
  rows,
  name = '',
  isRowClickable = false,
  onRowClick = () => { },
  loading = false,
  isEmpty = false,
  emptyText = 'Nothing to see here',
  currentPage,
  totalDataCount,
  pageLimit,
  pageRangeDisplayed = 3,
  onPageChage = () => { },
  fixedTableWidth = false,
}) => {
    return loading ? (
      <div
        className="
      bg-white rounded-md p-5
      flex items-center justify-center
      md:min-h-[500px]
    "
      >
        <Spinner fullScreen={false} />
      </div>
    ) : (
      <div className="bg-white flex rounded-md p-5 md:min-h-[500px]">
        {!isEmpty ? (
          <div
            className="
            w-full min-h-full
            flex flex-col gap-4
            justify-between
        "
          >
            <div
              className="
            overflow-x-scroll
            "
            >
              <table
                className={`
            min-w-full max-w-full
            divide-y divide-gray-300
            ${fixedTableWidth && '!table-fixed w-full'}
            `}
              >
                <thead>
                  <tr>
                    {headers.map((header, idx) => {
                      const key = `table-${name}-header${idx}`

                      return (
                        <th
                          scope="col"
                          className="
                        px-3 py-3.5 
                        first:pl-4 first:pr-3 first:sm:pl-3 
                        last:pl-3 last:pr-4 last:sm:pr-3
                        text-left text-sm font-semibold text-gray-900
                        border-b
                        "
                          key={key}
                        >
                          {header}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {rows?.map(({ id, content }, idx) => {
                    return (
                      <tr
                        key={id}
                        className={`
                    border-spacing-y-80
                    even:bg-gray-50
                    group
                    ${isRowClickable &&
                          `cursor-pointer 
                      md:hover:scale-[0.99]
                      transition-all duration-300
                      `
                          }`}
                        onClick={() => {
                          isRowClickable && onRowClick(id)
                        }}
                      >
                        {content.map((content, idx) => {
                          const key = `table-row-${id}-cell-${idx}`
                          return (
                            <td
                              className={`
                            px-3 py-4
                            first:pl-4 first:pr-3 first:sm:pl-3 
                            last:pl-3 last:pr-4 last:sm:pr-3
                            border-b border-t
                            first:border-l last:border-r
                            first:!rounded-s-lg last:!rounded-e-lg 
                            border-transparent
                            whitespace-nowrap text-sm font-medium text-gray-500
                            transition-all duration-300
                            overflow-hidden
                        `}
                              key={key}
                            >
                              {content}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage ?? 0}
              totalCount={totalDataCount ?? 0}
              itemsPerPage={pageLimit ?? NUMBER_OF_ITEMS_PER_PAGE}
              pageRangeDisplayed={pageRangeDisplayed}
              onPageChange={onPageChage}
            />
          </div>
        ) : (
          <div
            className="
      bg-white rounded-md p-5
      flex flex-col gap-4
      items-center justify-center
      md:min-h-[500px]
      w-full
    "
          >
            <div>
              {/* <CircleSlash size={36} /> */}
              /
            </div>

            <div>{emptyText}</div>
          </div>
        )}
      </div>
    )
  }
