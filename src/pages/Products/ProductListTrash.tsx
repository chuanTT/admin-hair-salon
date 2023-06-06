import { useMemo, useState } from "react"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { DeteleFuc, EventClickButton, RestoreFuc } from "@/config/configEvent"
import { RecoveryProduct, deleletProduct, getProduct, tableProduct } from "@/api/productApi"
import FilterProductTrash from "@/partials/Products/FilterProductTrash"

const ProductListTrash = () => {
  const [isRestore, setIsRestore] = useState(false)

  const configFuc = useMemo(
    () => [
      { ...RestoreFuc, onClick: EventClickButton(() => setIsRestore(true)) },
      { ...DeteleFuc, onClick: EventClickButton(() => setIsRestore(false)) }
    ],
    []
  )

  return (
    <TablePagination
      selectCheck={{
        views: true
      }}
      configDetail={config.table.configProduct}
      nameTable={tableProduct}
      callApi={getProduct}
      isDelete
      callApiDelete={isRestore ? RecoveryProduct : deleletProduct}
      configFuc={configFuc}
      is_restore={isRestore}
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
