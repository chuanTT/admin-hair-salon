import { fucPathName } from "@/common/functions"
import config from "@/config"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterProductSlide = () => {
  const { setIsOpen, listIDs } = useTablePagination()

  return (
    <LayoutDefaultFilter
      isButton
      to={fucPathName(config.router.addSlideshowProduct)}
      txtButton="Thêm trình chiếu"
      setIsOpen={setIsOpen}
      is_show={!!(listIDs && listIDs?.length > 1)}
    />
  )
}

export default FilterProductSlide
