import HTTP from "./axiosClient"

const tableOther = "other"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOtherCount = (url?: string) => {
  return HTTP.get(`/${tableOther}/count` ?? url)
}

export { getOtherCount, tableOther }
