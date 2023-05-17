import { deleletProduct, getProduct, tableProduct } from "@/api/productApi"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
const Product = () => {
  return (
    <TablePagination
      configDetail={config.table.configProduct}
      nameTable={tableProduct}
      callApi={getProduct}
      isDelete
      callApiDelete={deleletProduct}
      configFuc={configDefaultEvent}
      customUrl={({ nameTable, query, limit, page }) => {
        return query?.for(nameTable).page(page).limit(limit).url()
      }}
    />
  )
}

export default Product
