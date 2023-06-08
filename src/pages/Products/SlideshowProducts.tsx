import { deleletProduct, getSliderProduct, tableSliderProduct } from "@/api/productApi"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
import FilterProductSlide from "@/partials/Products/FilterProductSlide"
const SlideshowProducts = () => {
  return (
    <TablePagination
      selectCheck={{
        views: true
      }}
      configDetail={config.table.configProductSildeShow}
      nameTable={tableSliderProduct}
      callApi={getSliderProduct}
      isDelete
      callApiDelete={deleletProduct}
      configFuc={configDefaultEvent}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, key: "name" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <FilterProductSlide />
    </TablePagination>
  )
}

export default SlideshowProducts
