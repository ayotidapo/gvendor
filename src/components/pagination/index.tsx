import React from 'react'

interface PaginationProps {
  currentPage: number
  totalCount: number
  itemsPerPage: number
  pageRangeDisplayed: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  itemsPerPage,
  pageRangeDisplayed,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const getPageNumbers = (): any => {
    if (totalPages > pageRangeDisplayed) {
      const startPage = Math.max(2, currentPage - 2)
      const endPage = Math.min(totalPages - 1, currentPage + 2)

      let pages = []
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (startPage > 2) {
        pages = ['...', ...pages]
      }
      if (endPage < totalPages - 1) {
        pages = [...pages, '...']
      }

      return [1, ...pages, totalPages]
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex list-none gap-3">
        <li
          className={` ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <button
            onClick={() => {
              handlePageChange(currentPage - 1)
            }}
            className="px-3 py-1 border hover:bg-gray-200 shadow-3xl bg-white rounded-full h-10 w-10"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
        {getPageNumbers().map((number: number, index: number) => (
          <li key={index} className="">
            {typeof number === 'string' ? (
              <span className="px-3 py-1">{number}</span>
            ) : (
              <button
                onClick={() => {
                  handlePageChange(number)
                }}
                className={`px-3 py-1 border shadow-3xl bg-white rounded-full h-10 w-10 ${
                  number === currentPage
                    ? 'bg-blue-500 text-light-blue font-bold'
                    : 'hover:bg-gray-200'
                }`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li
          className={` ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <button
            onClick={() => {
              handlePageChange(currentPage + 1)
            }}
            className="px-3 py-1 border hover:bg-gray-200 shadow-3xl bg-white rounded-full h-10 w-10"
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
