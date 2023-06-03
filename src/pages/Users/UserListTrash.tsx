import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
import { deleteUser, getUser, tableUser } from "@/api/usersApi"
import FilterUserTrash from "@/partials/Users/FilterUserTrash"

const UserListTrash = () => {
  return (
    <TablePagination
      selectCheck={{
        views: true
      }}
      configDetail={config.table.configUsers}
      nameTable={tableUser}
      callApi={getUser}
      isDelete
      callApiDelete={deleteUser}
      configFuc={configDefaultEvent}
      is_force={1}
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
