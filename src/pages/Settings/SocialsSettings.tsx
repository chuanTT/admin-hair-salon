import { useMemo, useRef, useState } from "react"
import config from "@/config"
import TablePagination from "@/layout/TablePagination"
import { DeteleFuc, EditFuc } from "@/config/configEvent"
import { typeEventClick } from "@/types"
import { isEmptyObj } from "@/common/functions"
import { deleteSocials, getSocials, tableSocials } from "@/api/socialsApi"
import FilterSocials from "@/partials/Settings/FilterSocials"

const SocialsSettings = () => {
  const idSocials = useRef({ id: 0, isEdit: false })
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
          idSocials.current = {
            ...idSocials.current,
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
      configDetail={config.table.configSocials}
      nameTable={tableSocials}
      callApi={getSocials}
      isDelete
      callApiDelete={deleteSocials}
      configFuc={configFuc}
      is_checkEvent
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, key: "name" })
        if (!isEmptyObj(obj)) {
          url = url?.params(obj)
        }
        return url?.url()
      }}
    >
      <FilterSocials idCate={idSocials} isOpenModal={isOpen} setIsOpenModal={setIsOpen} />
    </TablePagination>
  )
}

export default SocialsSettings
