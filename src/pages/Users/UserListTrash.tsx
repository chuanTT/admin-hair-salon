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
        let obj = {}
        if (searchValue?.user && searchValue?.user !== -1) {
          obj = { ...obj, user_name: searchValue?.user }
        }
        if (searchValue?.full_name && searchValue?.submit) {
          obj = { ...obj, full_name: searchValue?.full_name }
        }

        url = url?.params({
          ...obj,
          is_deleted: 1
        })

        return url?.url()
      }}
    >
      <FilterUserTrash />
    </TablePagination>
  )
}

export default UserListTrash
