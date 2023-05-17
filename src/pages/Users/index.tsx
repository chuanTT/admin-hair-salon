import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import {  configDefaultEvent } from "@/config/configEvent"
import { deleteUser, getUser, tableUser } from "@/api/usersApi"

const Users = () => {
  return (
    <TablePagination
      configDetail={config.table.configUsers}
      nameTable={tableUser}
      callApi={getUser}
      isDelete
      callApiDelete={deleteUser}
      configFuc={configDefaultEvent}
      customUrl={({ nameTable, query, limit, page }) => {
        return query?.for(nameTable).page(page).limit(limit).url()
      }}
    />
  )
}

export default Users
