import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { EditFuc } from "@/config/configEvent"
import { getRoles, tableRole } from "@/api/rolesApi"

const Permission = () => {
  return (
    <TablePagination
      configDetail={config.table.configPermission}
      nameTable={tableRole}
      callApi={getRoles}
      configFuc={[EditFuc]}
      customUrl={({ nameTable, query, limit, page }) => {
        return query?.for(nameTable).page(page).limit(limit).url()
      }}
    />
  )
}

export default Permission
