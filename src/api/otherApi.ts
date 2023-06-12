import { typeObject } from "@/types"
import HTTP from "./axiosClient"

const tableOther = "other"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOtherCount = (url?: string) => {
  return HTTP.get(`/${tableOther}/count` ?? url)
}

const getLoadSettingsLogo = (url?: string) => {
  return HTTP.get(`/${tableOther}/${url}`)
}

const getChartDoashBoard = (url?: string) => {
  return HTTP.get(url ?? "")
}

const UpdateLogo = (data: number | string | FormData | undefined | typeObject) => {
  return HTTP.post(`${tableOther}/settings/update_logo`, data)
}

const UpdateIcon = (data: number | string | FormData | undefined | typeObject) => {
  return HTTP.post(`${tableOther}/settings/update_icon`, data)
}

const getSettings = (url?: string) => {
  return HTTP.get(`${tableOther}/settings` ?? url)
}

export { getOtherCount, tableOther, getLoadSettingsLogo, UpdateLogo, getSettings, UpdateIcon, getChartDoashBoard }
