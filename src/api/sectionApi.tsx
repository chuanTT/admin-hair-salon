import { typeObject } from "@/types"
import HTTP from "./axiosClient"

const tableSection = "section"

const getSection = (url: string) => {
  return HTTP.get(url)
}

const AddSectionApi = (data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableSection}`, data)
}

const UpdateSection = (id: number | string, data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableSection}/${id}`, data)
}

const deleteSection = (ids: string | number | (string | number)[]) => {
  let id: string | number = 0

  if (Array.isArray(ids)) {
    if (ids?.length > 0) {
      id = ids[0]
    }
  }
  return HTTP.delete(`${tableSection}/${id}`)
}

const UpdateSectionShow = (id: number | string, data: number | string | FormData | undefined | typeObject) => {
  return HTTP.patch(`${tableSection}/show/${id}`, data)
}

const UpdateSectionShowIndex = (id: number | string, data: number | string | FormData | undefined | typeObject) => {
  return HTTP.patch(`${tableSection}/show_index/${id}`, data)
}

export { tableSection, getSection, deleteSection, UpdateSection, AddSectionApi, UpdateSectionShow, UpdateSectionShowIndex }
