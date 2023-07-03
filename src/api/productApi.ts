import { typeObject } from "@/types"
import HTTP from "./axiosClient"

const tableProduct = "product"
const tableSliderProduct = "slider-product"
const tableCategory = "category"

const getProduct = (url: string) => {
  return HTTP.get(url)
}

const getSliderProduct = (url: string) => {
  return HTTP.get(`/${tableProduct}${url}`)
}

const getCategory = (url: string) => {
  return HTTP.get(url)
}

//  @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addProductApi = (data: any) => {
  return HTTP.post(`${tableProduct}`, data)
}

//  @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addCategory = (data: any) => {
  return HTTP.post(`${tableCategory}`, data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addProductSlideApi = (data: any) => {
  return HTTP.post(`${tableProduct}/${tableSliderProduct}`, data)
}

const RecoveryProduct = (data: (string | number)[]) => {
  return HTTP.patch(`${tableProduct}`, {
    ids: data
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateCategory = (id: number | string, data: any) => {
  return HTTP.patch(`${tableCategory}/${id}`, data)
}

const UpdateProduct = (id: number | string, data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableProduct}/${id}`, data)
}

const UpdateProductSlider = (id: number | string, data: number | string | FormData | undefined | typeObject) => {
  return HTTP.post(`${tableProduct}/${tableSliderProduct}/${id}`, data)
}

const deleletProduct = (data: (string | number)[], is_force?: string | number) => {
  return HTTP.delete(`${tableProduct}${!is_force ? "" : "?is_force=1"}`, {
    data: {
      ids: data
    }
  })
}

const deleletProductSlide = (data: (string | number)[]) => {
  return HTTP.delete(`${tableProduct}/${tableSliderProduct}`, {
    data: {
      ids: data
    }
  })
}

const deleletCategory = (ids: string | number | (string | number)[]) => {
  let id: string | number = 0

  if (Array.isArray(ids)) {
    if (ids?.length > 0) {
      id = ids[0]
    }
  }
  return HTTP.delete(`${tableCategory}/${id}`)
}

export {
  getProduct,
  deleletProduct,
  tableProduct,
  addProductApi,
  getSliderProduct,
  tableSliderProduct,
  UpdateProduct,
  RecoveryProduct,
  UpdateProductSlider,
  addProductSlideApi,
  deleletProductSlide,
  getCategory,
  tableCategory,
  deleletCategory,
  addCategory,
  updateCategory
}
