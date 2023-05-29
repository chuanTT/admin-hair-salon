import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
import { deleteUser, getUser, tableUser } from "@/api/usersApi"
import FilterUser from "@/partials/Users/FilterUser"

const Users = () => {
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
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        if (searchValue?.user && searchValue?.user !== -1) {
          url = url?.params({
            user_name: searchValue?.user
          })
        }
        if (searchValue?.full_name && searchValue?.submit) {
          url = url?.params({
            full_name: searchValue?.full_name
          })
        }

        return url?.url()
      }}
    >
      <FilterUser />
    </TablePagination>
  )
}

export default Users
