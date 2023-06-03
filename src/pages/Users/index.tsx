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
        const obj = config.filter.user({ searchValue })
        url = url?.params(obj)

        return url?.url()
      }}
    >
      <FilterUser />
    </TablePagination>
  )
}

export default Users
