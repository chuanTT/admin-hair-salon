import { PermissionDefault, TypeEventPermission, defaultProps } from "@/types"
import { FC, createContext, useContext, useEffect, useState } from "react"
import { useProtectedLayout } from "../ProtectedLayout"
import { fucBreadCrumb, isEmptyObj } from "@/common/functions"
import { useLocation } from "react-router-dom"

const PermissonLayoutContext = createContext({})

const initEvent = {
  READ: false,
  CREATE: false,
  UPDATE: false,
  DELETE: false
}

export interface ValuePermission {
  checkEvent?: TypeEventPermission
  KeyPermission?: (key: string) => void
  nameRole?: string
  permissionArr?: PermissionDefault[]
}

const PermissonLayout: FC<defaultProps> = ({ children }) => {
  const { user } = useProtectedLayout()
  const [checkEvent, setCheckEvent] = useState<TypeEventPermission>({ ...initEvent })
  const nameRole = user?.role?.name || ""
  const permissionArr = user?.role?.permissions ?? []
  const location = useLocation()
  const [isFisrt, setIsFisrt] = useState(false)

  const KeyPermission = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newEvent: any = { ...initEvent }

    if (!isEmptyObj(newEvent)) {
      const arrPer = permissionArr.find((permiss) => permiss?.name === key)

      if (arrPer) {
        const nEv = Object.keys(newEvent)
        nEv.forEach((ev) => {
          const isEvent = arrPer?.events?.find((event) => event?.name === ev)
          newEvent[ev] = isEvent ? true : false
        })
      }
    }

    setCheckEvent(() => newEvent)
  }

  useEffect(() => {
    fucBreadCrumb({
      path: location.pathname,
      callOptCustom: (config) => {
        return (
          {
            title: config?.title,
            key: config?.key,
            keyParent: config?.keyParent
          } ?? {}
        )
      },
      callOptChild: (config) => {
        return (
          {
            title: config?.title,
            key: config?.key,
            keyParent: config?.keyParent
          } ?? {}
        )
      },
      callEndLoop: (config) => {
        if (config) {
          let key = ""
          const arrConfigRever = [...config].reverse()
          for (const item of arrConfigRever) {
            const keyItem = Array.isArray(item?.key) ? item?.keyParent : item?.key
            if (keyItem) {
              key = keyItem
              break
            }
          }

          if (key) {
            KeyPermission(key)
          }
        }
      }
    })
    setIsFisrt(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value: ValuePermission = {
    checkEvent,
    KeyPermission,
    nameRole,
    permissionArr
  }

  return <PermissonLayoutContext.Provider value={value}>{isFisrt && children}</PermissonLayoutContext.Provider>
}

export const usePermissions = () => {
  const result: ValuePermission = useContext(PermissonLayoutContext)
  return result
}

export default PermissonLayout
