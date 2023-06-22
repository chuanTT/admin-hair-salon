import HTTP from "./axiosClient"

const tableUser = "user"

const getUser = (url: string) => {
  return HTTP.get(url)
}

const AddUser = (data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableUser}`, data)
}

const UpdateUser = (id: number | string, data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableUser}/${id}`, data)
}

const deleteUser = (data: (string | number)[], is_force?: string | number) => {
  return HTTP.delete(`${tableUser}${!is_force ? "" : "?is_force=1"}`, {
    data: {
      ids: data
    }
  })
}

const getMeApi = (url: string) => {
  return HTTP.get(`${tableUser}${url}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const resetPassword = (id: string | number, data: any) => {
  return HTTP.patch(`${tableUser}/reset-password/${id}`, data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changePassword = (data: any) => {
  return HTTP.patch(`${tableUser}/change-password`, data)
}

const RecoveryUser = (data: (string | number)[]) => {
  return HTTP.patch(`${tableUser}`, {
    ids: data
  })
}

export { getUser, deleteUser, AddUser, UpdateUser, tableUser, RecoveryUser, resetPassword, getMeApi, changePassword }
