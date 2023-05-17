import { Pagination as PaginationPages } from "react-pagination-bar"
import "react-pagination-bar/dist/index.css"

interface PaginationProps {
  perPages: number
  totalPages: number
  limitPages: number
  onPagesChanges: (p: number) => void
}

function Pagination({ perPages, totalPages, limitPages, onPagesChanges }: PaginationProps) {
  return (
    <PaginationPages
      customClassNames={{
        rpbItemClassNameActive: "!bg-indigo-500 !text-white",
        rpbItemClassNameDisable: "hidden",
        rpbItemClassName:
          "inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white hover:!bg-indigo-500 border border-slate-200 hover:text-white cursor-pointer text-slate-600"
      }}
      currentPage={perPages}
      itemsPerPage={limitPages}
      onPageChange={onPagesChanges}
      totalItems={totalPages}
      pageNeighbours={2}
    />
  )
}

export default Pagination
