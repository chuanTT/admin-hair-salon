import { UpdateRole } from "@/types"
import HTTP from "./axiosClient"

const tableRole = "roles"

const getRoles = (url: string) => {
  return HTTP.get(url)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPermissionsList = (_url: string) => {
  return HTTP.get(`${tableRole}/permissions`)
}

const updatePermissions = (id: number | string, data: UpdateRole[]) => {
  return HTTP.patch(`${tableRole}/${id}`, {
    permissions: data
  })
}

export { getRoles, tableRole, getPermissionsList, updatePermissions }
