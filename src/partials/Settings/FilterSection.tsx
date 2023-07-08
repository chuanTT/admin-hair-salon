import { fucPathName } from "@/common/functions"
import config from "@/config"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterSection = () => {
  const { setIsOpen } = useTablePagination()

  return (
    <LayoutDefaultFilter
      isButton
      isEvent
      to={fucPathName(config.router.addSection)}
      txtButton="Thêm thành phần"
      setIsOpen={setIsOpen}
    />
  )
}

export default FilterSection
