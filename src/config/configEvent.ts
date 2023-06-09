import { sliceRouteDynamic } from "@/common/functions"
import { iconTypeEvent } from "@/components/Button"
import { Event, TypeEventPermission, typeEvent, typeEventClick } from "@/types"
import config from "."
import { arrRootAdmin } from "@/common/fuctionPermission"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fucIsViews = (checkEvents?: TypeEventPermission, type?: Event, role?: any[], nameRole?: string) => {
  let isViews = true
  if (checkEvents && type) {
    isViews = checkEvents?.[type]
  }

  if (role && Array.isArray(role)) {
    isViews = role?.includes(nameRole)
  }

  return isViews
}
export const EditFuc: typeEvent = {
  id: "edit",
  content: "Chỉnh sửa",
  customClass: "text-slate-400 hover:text-slate-500",
  key: "id",
  isViews: fucIsViews,
  type: iconTypeEvent.edit,
  typeEvent: Event.UPDATE,
  to: sliceRouteDynamic(config.router.editUser)
}

export const ViewsImagesFuc: typeEvent = {
  id: "view_images",
  content: "Xem hình ảnh",
  customClass: "text-slate-400 hover:text-slate-500",
  key: "thumb",
  isViews: true,
  type: iconTypeEvent.viewsImage
}

export const ResetPassFuc: typeEvent = {
  id: "reset_pass",
  content: "Reset mật khẩu",
  customClass: "text-blue-400 hover:text-blue-500",
  key: "id",
  isViews: fucIsViews,
  role: arrRootAdmin,
  type: iconTypeEvent.reset
}

export const RestoreFuc: typeEvent = {
  id: "restore",
  content: "Khôi phục",
  customClass: "text-blue-400 hover:text-blue-500",
  key: "id",
  isViews: true,
  type: iconTypeEvent.restore
}

export const EventClickButton =
  (callBack?: () => void): ((obj: typeEventClick) => void) =>
  ({ id, provider }: typeEventClick) => {
    if (provider) {
      const { handelDelete } = provider
      if (typeof handelDelete === "function") {
        handelDelete(id)
      }
    }

    callBack && callBack()
  }

export const DeteleFuc: typeEvent = {
  id: "delete",
  content: "Xóa",
  customClass: "text-rose-500 hover:text-rose-600",
  key: "id",
  isViews: fucIsViews,
  type: iconTypeEvent.delete,
  typeEvent: Event.DELETE,
  onClick: EventClickButton()
}

export const dynamicFucEvent = (to?: string, key?: string, callBack?: (str: string) => string) => {
  let str = sliceRouteDynamic(to || "")
  if (callBack) {
    str = callBack(str)
  }
  return [{ ...EditFuc, to: str, key: key || "alias" }, DeteleFuc]
}

export const configDefaultEvent: typeEvent[] = [EditFuc, DeteleFuc]
