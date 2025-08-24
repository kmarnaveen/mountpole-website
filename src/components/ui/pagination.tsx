import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className = "",
}: PaginationProps) {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // If total pages fit within max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate range around current page
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);

      // Adjust if we're near the beginning or end
      if (currentPage <= halfVisible) {
        endPage = Math.min(totalPages, maxVisiblePages);
      } else if (currentPage > totalPages - halfVisible) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Add visible page range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* First page button */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          className="hidden sm:flex"
        >
          First
        </Button>
      )}

      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center space-x-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <div key={`ellipsis-${index}`} className="px-2">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <Button
              key={pageNumber}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              className={`min-w-[40px] ${
                isCurrentPage
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center space-x-1"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last page button */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className="hidden sm:flex"
        >
          Last
        </Button>
      )}
    </div>
  );
}

// Helper hook for pagination logic
export function usePagination<T>(items: T[], itemsPerPage: number = 12) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  // Reset to page 1 if current page is out of bounds
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    totalItems: items.length,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, items.length),
  };
}

// Pagination info component
export function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  className = "",
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  className?: string;
}) {
  if (totalItems === 0) {
    return (
      <div className={`text-sm text-gray-600 ${className}`}>No items found</div>
    );
  }

  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      Showing <span className="font-medium">{startIndex}</span> to{" "}
      <span className="font-medium">{endIndex}</span> of{" "}
      <span className="font-medium">{totalItems}</span> results
      {totalPages > 1 && (
        <>
          {" "}
          (Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>)
        </>
      )}
    </div>
  );
}
