import HTTP from "./axiosClient"

const tableProduct = "product"
const tableSliderProduct = "slider-product"

const getProduct = (url: string) => {
  return HTTP.get(url)
}

const getSliderProduct = (url: string) => {
  return HTTP.get(`/${tableProduct}${url}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addProductApi = (data: unknown) => {
  return HTTP.post(`${tableProduct}`, data)
}

const deleletProduct = (data: (string | number)[], is_force?: string | number) => {
  return HTTP.delete(`${tableProduct}${!is_force ? "" : "?is_force=1"}`, {
    data: {
      ids: data
    }
  })
}

export { getProduct, deleletProduct, tableProduct, addProductApi, getSliderProduct, tableSliderProduct }
