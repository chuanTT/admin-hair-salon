import { AxiosResponse } from "axios"
import QueryRequest from "@/api/builder/QueryRequest"
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query"
//   import QueryRequest from "@/api/builder/QueryRequest";
// import { QueryRequest } from "../apis";
import { useEffect } from "react"
import { typeObject } from "@/types"

export interface customUrlProps {
  nameTable?: string
  page?: number
  limit?: number
  query?: QueryRequest
  RestProps?: typeObject
  [key: string]: string | number | undefined | QueryRequest | typeObject
}

interface useFetchingApiParmeter {
  nameTable: string
  page?: number
  limit?: number
  customUrl?: (props: customUrlProps) => void | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CallAPi?: (url: string) => Promise<AxiosResponse<any, any>>
  update?: boolean
  configCus?: UseQueryOptions
  isConfig?: boolean
  retry?: number
  RestProps?: typeObject
}

const useFetchingApi = ({
  nameTable = "",
  page = 1,
  limit = 10,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  customUrl = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  CallAPi = () => new Promise((resolve) => resolve),
  update = false,
  configCus = {},
  isConfig = true,
  retry = 1,
  ...RestProps
}: useFetchingApiParmeter) => {
  const queryClient = useQueryClient()
  const query = new QueryRequest()
  const url =
    customUrl({ query, nameTable, page, limit, ...RestProps }) || query.for(nameTable).page(page).limit(limit).url()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = isConfig ? { keepPreviousData: true, retry } : configCus

  const { isPreviousData, data, ...rest } = useQuery([nameTable, url], () => CallAPi(url), config)

  const prefetchQueryClient = () => {
    queryClient.prefetchQuery([nameTable, url], () => CallAPi(url))
  }

  const invalidateQueriesQueryClient = () => {
    queryClient.invalidateQueries([nameTable, url])
  }

  const removeData = () => {
    rest?.remove()
  }

  useEffect(() => {
    if (!isPreviousData && data?.data?.pagination?.last_page > page) {
      queryClient.prefetchQuery([nameTable, url], () => CallAPi(url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, update])

  return {
    isPreviousData,
    data,
    prefetchQueryClient,
    invalidateQueriesQueryClient,
    removeData,
    ...rest
  }
}

export default useFetchingApi
