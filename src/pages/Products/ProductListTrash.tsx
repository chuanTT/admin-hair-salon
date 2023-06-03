import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
import { deleteUser } from "@/api/usersApi"
import { deleletProduct, getProduct, tableProduct } from "@/api/productApi"
import FilterProductTrash from "@/partials/Products/FilterProductTrash"

const ProductListTrash = () => {
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
      configFuc={configDefaultEvent}
      is_force={1}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(`${nameTable}`).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, is_deleted: true, key: "name" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <FilterProductTrash />
    </TablePagination>
  )
}

export default ProductListTrash
