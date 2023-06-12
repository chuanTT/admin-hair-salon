import { PermissionDefault, TypeEventPermission, defaultProps } from "@/types"
import { FC, createContext, useContext, useState } from "react"
import { useProtectedLayout } from "../ProtectedLayout"
import { isEmptyObj } from "@/common/functions"

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

    setCheckEvent(newEvent)
  }

  const value: ValuePermission = {
    checkEvent,
    KeyPermission,
    nameRole,
    permissionArr
  }

  return <PermissonLayoutContext.Provider value={value}>{children}</PermissonLayoutContext.Provider>
}

export const usePermissions = () => {
  const result: ValuePermission = useContext(PermissonLayoutContext)
  return result
}

export default PermissonLayout
