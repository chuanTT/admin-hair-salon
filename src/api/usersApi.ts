import HTTP from "./axiosClient"

const tableUser = "user"

const getUser = (url: string) => {
  return HTTP.get(url)
}

const AddUser = (data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableUser}`, data)
}

const UpdateUser = (id: number | string,data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableUser}/${id}`, data)
}


const deleteUser = (id: number | string) => {
  return HTTP.delete(`${tableUser}/${id}`)
}

export { getUser, deleteUser, AddUser, UpdateUser, tableUser }
