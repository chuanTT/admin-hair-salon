import HTTP from "./axiosClient"

const tableSocials = "socials"

const getSocials = (url: string) => {
  return HTTP.get(url)
}

const AddSocials = (data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableSocials}`, data)
}

const UpdateSocials = (id: number | string, data: number | string | FormData | undefined) => {
  return HTTP.post(`${tableSocials}/${id}`, data)
}

const deleteSocials = (ids: string | number | (string | number)[]) => {
  let id: string | number = 0

  if (Array.isArray(ids)) {
    if (ids?.length > 0) {
      id = ids[0]
    }
  }
  return HTTP.delete(`${tableSocials}/${id}`)
}

export { tableSocials, getSocials, deleteSocials, UpdateSocials, AddSocials }
