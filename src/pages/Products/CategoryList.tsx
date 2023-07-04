import { useMemo, useRef, useState } from "react"
import { deleletCategory, getCategory, tableCategory } from "@/api/productApi"
import config from "@/config"
import TablePagination from "@/layout/TablePagination"
import FilterCategory from "@/partials/Products/FilterCategory"
import { DeteleFuc, EditFuc } from "@/config/configEvent"
import { typeEventClick } from "@/types"

const CategoryList = () => {
  const idCate = useRef({ id: 0, isEdit: false })
  const [isOpen, setIsOpen] = useState(false)

  const configFuc = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { typeEvent, ...restDelete } = DeteleFuc
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { typeEvent: TyEventEdit, to, ...restEdit } = EditFuc
    return [
      { ...restDelete },
      {
        ...restEdit,
        onClick(obj: typeEventClick) {
          const { id } = obj
          idCate.current = {
            ...idCate.current,
            id: id as number,
            isEdit: true
          }
          setIsOpen(() => true)
        }
      }
    ]
  }, [])

  return (
    <TablePagination
      configDetail={config.table.configCategory}
      nameTable={tableCategory}
      callApi={getCategory}
      isDelete
      callApiDelete={deleletCategory}
      configFuc={configFuc}
      is_checkEvent
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, key: "name" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <FilterCategory
        idCate={idCate}
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpen}
      />
    </TablePagination>
  )
}

export default CategoryList
