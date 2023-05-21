import HTTP from "./axiosClient"

const tableRole = "roles"

const getRoles = (url: string) => {
  return HTTP.get(url)
}


export { getRoles, tableRole }
