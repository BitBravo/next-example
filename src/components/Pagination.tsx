import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { DOTS, usePagination } from "hooks/usePagination";
import { PaginationProps } from "types/pagination";

const Pagination = (props: PaginationProps) => {
  const { onPageChange, siblingCount = 1, currentPage = 1, totalCount = 18 } = props;

  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalCount
  });

  if (currentPage === 0 && !paginationRange) {
    return null;
  }

  const onNext = () => {
    if (onPageChange) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (onPageChange) onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pb-8 pt-14 sm:px-6">
      <div className="sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
              onClick={onPrevious}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {paginationRange?.map((pageNumber: number | string, key: number) => {
              const activeClass = pageNumber === currentPage ? " text-indigo-600" : " bg-gray-50";
              if (pageNumber === DOTS) {
                return (
                  <a className="pagination-item dots w-10 inline-flex justify-center" key={key}>
                    &#8230;
                  </a>
                );
              }

              return (
                <a
                  aria-current="page"
                  className={
                    "w-10 justify-center relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer " +
                    activeClass
                  }
                  key={key}
                  onClick={() => onPageChange(pageNumber as number)}
                >
                  <span>{pageNumber}</span>
                </a>
              );
            })}
            <a
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
              onClick={onNext}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
