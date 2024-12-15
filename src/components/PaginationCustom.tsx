import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function PaginationCustom({
  page,
  count,
  setPage,
}: {
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNext = () => {
    if (page < count) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Memoize visible pages for performance
  const visiblePages = React.useMemo(() => {
    const pages: number[] = [];
    if (count <= 5) {
      for (let i = 1; i <= count; i++) pages.push(i);
    } else {
      if (page > 1) pages.push(page - 1);
      pages.push(page);
      if (page < count) pages.push(page + 1);
    }
    return pages;
  }, [page, count]);

  // Utility function for active class
  const activeClass = (current: number) =>
    current === page ? " bg-rose-400 text-white" : "";

  return (
    <Pagination className="z-10 col-span-full my-10">
      <PaginationContent className="flex items-center gap-2 md:gap-3">
        {/* Previous Button */}
        <PaginationItem>
          <button
            disabled={page === 1}
            className={`flex items-center md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-gray-50 rounded-full text-black ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
          >
            <ArrowLeft className="hidden md:block" /> Prev
          </button>
        </PaginationItem>

        {/* First Page */}
        <PaginationItem>
          <PaginationLink
            onClick={() => setPage(1)}
            className={`rounded-md px-3 py-1 ${activeClass(1)}`}
            aria-current={page === 1 ? "page" : undefined}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Left Ellipsis */}
        <div className="hidden md:block">
          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </div>

        {/* Middle Pages */}
        {visiblePages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => setPage(p)}
              className={`rounded-md px-3 py-1 ${activeClass(p)}`}
              aria-current={page === p ? "page" : undefined}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right Ellipsis */}
        <div className="hidden md:block">
          {page < count - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </div>

        {/* Last Page */}
        {count > 1 && page < count && (
          <PaginationItem>
            <PaginationLink
              onClick={() => setPage(count)}
              className={`rounded-md px-3 py-1 ${activeClass(count)}`}
              aria-current={page === count ? "page" : undefined}
            >
              {count}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next button */}
        <PaginationItem>
          <button
            disabled={page === count}
            className={`flex items-center md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-gray-50 rounded-full text-black ${
              page === count ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
          >
            Next <ArrowRight className="hidden md:block" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
