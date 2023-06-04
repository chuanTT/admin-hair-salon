import { deleletProduct, getProduct, tableProduct } from "@/api/productApi"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { dynamicFucEvent } from "@/config/configEvent"
import FilterProduct from "@/partials/Products/FilterProduct"
const Product = () => {
  return (
    <TablePagination
      selectCheck={{
        views: true
      }}
      configDetail={config.table.configProduct}
      nameTable={tableProduct}
      callApi={getProduct}
      isDelete
      callApiDelete={deleletProduct}
      configFuc={dynamicFucEvent(config.router.editProduct)}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, key: "name" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <FilterProduct />
    </TablePagination>
  )
}

export default Product
