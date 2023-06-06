import HTTP from "./axiosClient"

const tableBlog = "blog"

const getBlog = (url: string) => {
  return HTTP.get(url)
}

//  @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addBlogApi = (data: any) => {
  return HTTP.post(`${tableBlog}`, data)
}

const UpdateBlog = (id: number | string, data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableBlog}/${id}`, data)
}

const RecoveryBlog = (data: (string | number)[]) => {
  return HTTP.patch(`${tableBlog}`, {
    ids: data
  })
}


const deleleteBlog = (data: (string | number)[], is_force?: string | number) => {
  return HTTP.delete(`${tableBlog}${!is_force ? "" : "?is_force=1"}`, {
    data: {
      ids: data
    }
  })
}

export { getBlog, deleleteBlog, tableBlog, addBlogApi, UpdateBlog, RecoveryBlog }
