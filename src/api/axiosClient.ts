import axios from "axios"
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
  function (config) {
    // Do something before request is sent
    // const auth = lsAuth();

    // if (auth?.apiToken) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0MDUxNDE3LCJleHAiOjE3MjAwNTE0MTd9.4yz6xQwn_IINtuwQNSuqfJBSxqxPghO3M5DBwGcr-rE`
    // }

    return config
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
