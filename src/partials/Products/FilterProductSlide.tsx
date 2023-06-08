import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import config from "@/config"
import { configUserIdApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterProductSlide = () => {

  return (
    <LayoutDefaultFilter
      isButton
      to={config.router.addSlideshowProduct}
      txtButton="Thêm trình chiếu"
    />
  )
}

export default FilterProductSlide
