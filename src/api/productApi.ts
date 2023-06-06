import HTTP from "./axiosClient"

const tableProduct = "product"
const tableSliderProduct = "slider-product"

const getProduct = (url: string) => {
  return HTTP.get(url)
}

const getSliderProduct = (url: string) => {
  return HTTP.get(`/${tableProduct}${url}`)
}

//  @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addProductApi = (data: any) => {
  return HTTP.post(`${tableProduct}`, data)
}

const RecoveryProduct = (data: (string | number)[]) => {
  return HTTP.patch(`${tableProduct}`, {
    ids: data
  })
}

const UpdateProduct = (id: number | string, data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableProduct}/${id}`, data)
}


const deleletProduct = (data: (string | number)[], is_force?: string | number) => {
  return HTTP.delete(`${tableProduct}${!is_force ? "" : "?is_force=1"}`, {
    data: {
      ids: data
    }
  })
}

export { getProduct, deleletProduct, tableProduct, addProductApi, getSliderProduct, tableSliderProduct, UpdateProduct, RecoveryProduct }
