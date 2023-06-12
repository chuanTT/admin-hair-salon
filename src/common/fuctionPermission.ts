import { CustomRouteConfig } from "@/router/router"
import { PermissionDefault, RoleDefault } from "@/types"
import { isObject } from "./functions"

export const checkEvents = (objPer?: PermissionDefault[], arr?: string | string[]) => {
  let isPassEvent = false
  if (Array.isArray(arr)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let arrPer: any[] = objPer ?? []
    arr.forEach((key) => {
      const per = arrPer?.find((item) => item?.name === key)

      if (isObject(per) && per?.events) {
        isPassEvent = true
        arrPer = per?.events ?? []
      } else {
        if (Array.isArray(arrPer)) {
          isPassEvent = !!arrPer?.find((per) => per.name === key)
        }
      }
    })
  } else {
    isPassEvent = !!objPer?.find((event) => event?.name === arr)
  }
  return isPassEvent
}

const checkPermissions = (objPer?: PermissionDefault[], key?: string | string[]) => {
  let check = false
  if (Array.isArray(key)) {
    for (const value of key) {
      const checkArr = (objPer && !!objPer?.find((per) => per?.name === value)) || false
      if (checkArr) {
        check = true
        break
      }
    }
  } else {
    check = (objPer && !!objPer?.find((per) => per?.name === key)) || false
  }

  return check
}

export const CheckOneRolePermisson = (
  objPer?: PermissionDefault[],
  nameRole?: string,
  element?: CustomRouteConfig,
  isPermission?: boolean
) => {
  if (element?.key || element?.role) {
    if (element?.isEvent) {
      isPermission = checkEvents(objPer, element?.key)
    } else if (element?.key) {
      isPermission = checkPermissions(objPer, element?.key)
    } else {
      if (Array.isArray(element?.role)) {
        isPermission = element?.role?.includes(nameRole || "")
      } else {
        isPermission = element?.role === nameRole
      }
    }
  } else {
    isPermission = !element?.isNoRender
  }

  return isPermission
}

export const CheckRolePermissionFuc = (
  arrPer?: PermissionDefault[],
  element?: CustomRouteConfig,
  nameRole?: string
) => {
  let isPermission = false
  const checkParent = CheckOneRolePermisson(arrPer, nameRole, element, isPermission)

  if (checkParent) {
    const arrChildren = (element?.children && element?.children?.length > 0 && element?.children) || element

    if (Array.isArray(arrChildren)) {
      for (const value of arrChildren) {
        isPermission = CheckOneRolePermisson(arrPer, nameRole, value, isPermission)

        if (isPermission) break
      }
    } else {
      isPermission = CheckOneRolePermisson(arrPer, nameRole, arrChildren, isPermission)
    }
  }

  return isPermission
}
