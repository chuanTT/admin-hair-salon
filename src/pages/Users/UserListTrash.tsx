import { useMemo, useState } from "react"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { DeteleFuc, EventClickButton, RestoreFuc } from "@/config/configEvent"
import { RecoveryUser, deleteUser, getUser, tableUser } from "@/api/usersApi"
import FilterUserTrash from "@/partials/Users/FilterUserTrash"

const UserListTrash = () => {
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
      configDetail={config.table.configUsers}
      nameTable={tableUser}
      callApi={getUser}
      isDelete
      callApiDelete={isRestore ? RecoveryUser : deleteUser}
      configFuc={configFuc}
      is_force={1}
      is_restore={isRestore}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(`${nameTable}`).page(page).limit(limit)
        const obj = config.filter.user({ searchValue, is_deleted: true })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <FilterUserTrash />
    </TablePagination>
  )
}

export default UserListTrash
