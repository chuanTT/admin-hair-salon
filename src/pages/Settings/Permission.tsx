import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { EditFuc } from "@/config/configEvent"
import { getRoles, tableRole } from "@/api/rolesApi"
import { useMemo, useRef, useState } from "react"
import { typeEventClick } from "@/types"
import ModalUpdateRole from "@/components/ModalUpdateRole"

const Permission = () => {
  const [isOpen, setIsOpen] = useState(false)
  const idRole = useRef<number | string>(0)

  const configEdit = useMemo(() => {
    return [
      {
        ...EditFuc,
        to: "",
        onClick: ({ e, id }: typeEventClick) => {
          e?.preventDefault()
          setIsOpen((prev) => !prev)
          idRole.current = id
        }
      }
    ]
  }, [])

  return (
    <TablePagination
      configDetail={config.table.configPermission}
      nameTable={tableRole}
      callApi={getRoles}
      configFuc={configEdit}
      customUrl={({ nameTable, query, limit, page }) => {
        return query?.for(nameTable).page(page).limit(limit).sort(1).url()
      }}
    >
      <ModalUpdateRole id={idRole.current} isOpen={isOpen} setIsOpen={setIsOpen} />
    </TablePagination>
  )
}

export default Permission
