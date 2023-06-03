import HTTP from "./axiosClient"

const tableBlog = "blog"

const getBlog = (url: string) => {
  return HTTP.get(url)
}

const deleleteBlog = (data: (string | number)[], is_force?: string | number) => {
  return HTTP.delete(`${tableBlog}${!is_force ? "" : "?is_force=1"}`, {
    data: {
      ids: data
    }
  })
}

export { getBlog, deleleteBlog, tableBlog }
