import { fucBreadCrumb } from "@/common/functions"
import { optPath } from "@/components/Breadcrumb"
import { configSettingApi } from "@/config/configCallApi"
import useFetchingApi from "@/hooks/useFetchingApi"
import { defaultProps } from "@/types"
import { FC, createContext, useContext, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

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
  breadNav?: optPath[]
}

const CreateProviderSettings = createContext({})

const ProviderSettings: FC<defaultProps> = ({ children }) => {
  const pathName = useLocation()
  const [breadNav, setBreadNav] = useState<optPath[]>([])
  const {
    data: dataSettings,
    isFetched,
    remove,
    invalidateQueriesQueryClient
  } = useFetchingApi({
    ...configSettingApi
  })

  useEffect(() => {
    fucBreadCrumb({
      path: pathName?.pathname,
      callEndLoop: (config) => {
        setBreadNav(config ?? [])
        document.title = (config && config[config?.length - 1]?.title) ?? "Trang chủ"
      }
    })
  }, [pathName])

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
      invalidateQueriesQueryClient,
      breadNav
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSettings, isFetched, remove, breadNav])

  return <CreateProviderSettings.Provider value={value}>{children}</CreateProviderSettings.Provider>
}

export const useProviderSettings = () => {
  const data: valueSettingsProps = useContext(CreateProviderSettings)
  return data
}

export default ProviderSettings
