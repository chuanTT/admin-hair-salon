import HTTP from "./axiosClient"

const tableProduct = "product"

const getProduct = (url: string) => {
  return HTTP.get(url)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addProductApi = (data: unknown) => {
  return HTTP.post(`${tableProduct}`, data)
}

const deleletProduct = (id: number | string) => {
  return HTTP.delete(`${tableProduct}/${id}`)
}

export { getProduct, deleletProduct, tableProduct, addProductApi }
