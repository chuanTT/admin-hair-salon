import HTTP from "./axiosClient"

const LoginApi = (data: { account: string | number; password: string | number }) => {
  return HTTP.post("/auth/login", { ...data })
}

const verifyToken = (url?: string) => {
  return HTTP.get(url || "/auth/verify-token")
}

const LogoutApi = () => {
  return HTTP.get("/auth/logout")
}

export { LoginApi, verifyToken, LogoutApi }
