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

const RecoveryUser = (data: (string | number)[]) => {
  return HTTP.patch(`${tableUser}"}`, {
    data: {
      ids: data
    }
  })
}

export { getUser, deleteUser, AddUser, UpdateUser, tableUser, RecoveryUser }
