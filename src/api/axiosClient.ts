import axios from "axios"
import config from "@/config"
// import { lsAuth, lsRemoveAuth } from "../utils/Utils";

// export const API_BASE = process.env.API_BASE

const axiosClient = axios.create({
  baseURL: "https://hair-salon-api.onrender.com/api/v1",
  headers: {
    Accept: "application/json"
  }
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (configInterceptors) {
    if (configInterceptors.url !== config.router.login) {
      // Do something before request is sent
      const token = localStorage?.getItem("token")

      if (token) {
        configInterceptors.headers.Authorization = `Bearer ${token}`
      }
    }

    return configInterceptors
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      // lsRemoveAuth();
      document.location.replace("/login")
    }
    // if (error.response.status === 422) {
    //   return error.response.data;
    // }
    // if (error.response.status === 403) {
    //   return error.response.data;
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosClient
