import { useMemo, useRef, useState } from "react"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { ResetPassFuc, dynamicFucEvent } from "@/config/configEvent"
import { deleteUser, getUser, resetPassword, tableUser } from "@/api/usersApi"
import FilterUser from "@/partials/Users/FilterUser"
import PermissonCheckLayout from "@/layout/PermissonCheckLayout"
import { Event, typeEventClick } from "@/types"
import ModalResetPassword from "@/components/ModalResetPassword"
import { usePermissions } from "@/layout/PermissonLayout"
import { fucHasRole } from "@/common/fuctionPermission"

const Users = () => {
  const [isOpen, setIsOpen] = useState(false)
  const idUser = useRef(0)
  const { nameRole } = usePermissions()
  const hasRole = fucHasRole(nameRole)

  const configFuc = useMemo(
    () => [
      {
        ...ResetPassFuc,
        onClick: ({ id }: typeEventClick) => {
          idUser.current = id as number
          setIsOpen(true)
        }
      },
      ...dynamicFucEvent(config.router.editUser, "id")
    ],
    []
  )

  return (
    <PermissonCheckLayout event={Event.READ}>
      <TablePagination
        selectCheck={{
          views: true
        }}
        configDetail={config.table.configUsers}
        nameTable={tableUser}
        callApi={getUser}
        isDelete
        callApiDelete={deleteUser}
        configFuc={configFuc}
        customUrl={({ nameTable, query, limit, page, searchValue }) => {
          let url = query?.for(nameTable).page(page).limit(limit)
          const obj = config.filter.user({ searchValue })
          url = url?.params(obj)

          return url?.url()
        }}
      >
        {hasRole && (
          <ModalResetPassword id={idUser.current} setIsOpen={setIsOpen} isOpen={isOpen} callApiDelete={resetPassword} />
        )}
        <FilterUser />
      </TablePagination>
    </PermissonCheckLayout>
  )
}

export default Users
