import { configSettingApi } from "@/config/configCallApi"
import useFetchingApi from "@/hooks/useFetchingApi"
import { defaultProps } from "@/types"
import { FC, createContext, useContext, useEffect, useMemo } from "react"

export interface dataSettingsApi {
  icon?: string
  logo?: {
    settings?: {
      ["object-fit"]: string
      ["object-position"]: string
      [key: string]: string
    }
    src?: string
  }
}

export interface valueSettingsProps {
  dataSettings?: dataSettingsApi
  isFetched?: boolean
  remove?: () => void
  invalidateQueriesQueryClient?: () => void
}

const CreateProviderSettings = createContext({})

const ProviderSettings: FC<defaultProps> = ({ children }) => {
  const {
    data: dataSettings,
    isFetched,
    remove,
    invalidateQueriesQueryClient
  } = useFetchingApi({
    ...configSettingApi
  })

  useEffect(() => {
    if (dataSettings?.data?.icon) {
      const linkIcon = document.querySelector('link[rel="icon"]')
      if (linkIcon) {
        linkIcon.setAttribute("href", dataSettings?.data?.icon)
      }
    }
  }, [dataSettings])

  const value = useMemo(() => {
    return {
      dataSettings: dataSettings?.data,
      isFetched,
      remove,
      invalidateQueriesQueryClient
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSettings, isFetched, remove])

  return <CreateProviderSettings.Provider value={value}>{children}</CreateProviderSettings.Provider>
}

export const useProviderSettings = () => {
  const data: valueSettingsProps = useContext(CreateProviderSettings)
  return data
}

export default ProviderSettings
