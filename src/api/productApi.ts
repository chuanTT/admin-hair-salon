import HTTP from "./axiosClient"

const tableProduct = "product"

const getProduct = (url: string) => {
  return HTTP.get(url)
}

const deleletProduct = (id: number | string) => {
  return HTTP.delete(`${tableProduct}/${id}`)
}

export { getProduct, deleletProduct, tableProduct }
