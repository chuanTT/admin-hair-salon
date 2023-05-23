import { useEffect, useState } from "react"
import useFetchingApi, { customUrlProps, useFetchingApiParmeter } from "./useFetchingApi"
import { LIMIT_SELECT, funcKey, optionAddAll, unineArrayOption } from "@/common/ConfigSelectOption"
import QueryRequest from "@/api/builder/QueryRequest"
import { SelectDefault } from "@/types"

interface useFetchingOptionApiProps extends useFetchingApiParmeter {
  isSearching?: boolean
  keySearching?: string
  isOptionAll?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customOptionAll?: (obj: { optionAddAll?: (arr: any[]) => void | []; data: [] }) => []
  customFucKey?: (arr: []) => void
  keyUnine?: string
  limit?: number
  customUrlOption?: (props: customUrlProps) => QueryRequest | void
}

const useFethingOptionApi = ({
  isSearching = false,
  keySearching = "name",
  isOptionAll = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  customOptionAll = () => [],
  customFucKey = funcKey,
  keyUnine = "value",
  nameTable,
  CallAPi,
  limit = LIMIT_SELECT,
  retry = 1,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  customUrlOption = () => {}
}: useFetchingOptionApiProps) => {
  const [search, setSearch] = useState<string | number>("")
  const [option, setOption] = useState<SelectDefault[]>([])

  const { data, ...rest } = useFetchingApi({
    nameTable,
    CallAPi,
    limit,
    retry,
    customUrl: ({ query, nameTable, limit, page, ...rest }) => {
      let url =
        customUrlOption({ query, nameTable, limit, page, ...rest }) || query?.for(nameTable).limit(limit).page(page)

      if (isSearching && search) {
        if ((isOptionAll && search !== -1) || !isOptionAll) {
          if (typeof url !== "string") {
            url = url?.where(keySearching, search)
          }
        }
      }

      return url?.url()
    }
  })

  useEffect(() => {
    if (data?.data) {
      const result = isOptionAll
        ? customOptionAll({ optionAddAll, data: data.data }) || optionAddAll(data.data)
        : [...data.data]

      setOption((prev) => {
        return unineArrayOption(keyUnine, prev, customFucKey(result))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return { data, search, setSearch, option, setOption, ...rest }
}

export default useFethingOptionApi
