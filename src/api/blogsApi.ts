import HTTP from "./axiosClient"

const tableBlog = "blog"

const getBlog = (url: string) => {
  return HTTP.get(url)
}

const deleleteBlog = (id: number | string) => {
  return HTTP.delete(`${tableBlog}/${id}`)
}

export { getBlog, deleleteBlog, tableBlog }
