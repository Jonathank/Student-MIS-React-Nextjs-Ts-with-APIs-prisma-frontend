import React from 'react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  siblingCount?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const pagesToShow = siblingCount * 2 + 3;

  
  if (totalPages <= pagesToShow) {
    return (
      <div className="p-4 flex items-center justify-between text-gray-500">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div className="flex items-center gap-2 text-sm">
          {range(1, totalPages).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-2 rounded-sm ${page === p ? "bg-[#C3EBFA]" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => onPageChange(firstPageIndex)}
          className={`px-2 rounded-sm ${
            page === firstPageIndex ? 'bg-[#C3EBFA]' : ''
          }`}
        >
          {firstPageIndex}
        </button>
        {shouldShowLeftDots && <span className="px-2">...</span>}
        {/* Render the middle range */}
        {range(
          shouldShowLeftDots ? leftSiblingIndex : firstPageIndex + 1,
          shouldShowRightDots ? rightSiblingIndex : lastPageIndex - 1
        ).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-2 rounded-sm ${page === p ? 'bg-[#C3EBFA]' : ''}`}
          >
            {p}
          </button>
        ))}
        {shouldShowRightDots && <span className="px-2">...</span>}
        <button
          onClick={() => onPageChange(lastPageIndex)}
          className={`px-2 rounded-sm ${
            page === lastPageIndex ? 'bg-[#C3EBFA]' : ''
          }`}
        >
          {lastPageIndex}
        </button>
      </div>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;