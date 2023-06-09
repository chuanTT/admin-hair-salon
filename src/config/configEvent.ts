import { sliceRouteDynamic } from "@/common/functions"
import { iconTypeEvent } from "@/components/Button"
import { typeEvent, typeEventClick } from "@/types"
import config from "."
// import ModalImages from "@/components/ModalImages"

export const EditFuc: typeEvent = {
  id: "edit",
  content: "Chỉnh sửa",
  customClass: "text-slate-400 hover:text-slate-500",
  key: "id",
  isViews: true,
  type: iconTypeEvent.edit,
  to: sliceRouteDynamic(config.router.editUser)
}

export const ViewsImagesFuc: typeEvent = {
  id: "view_images",
  content: "Xem hình ảnh",
  customClass: "text-slate-400 hover:text-slate-500",
  key: "thumb",
  isViews: true,
  type: iconTypeEvent.viewsImage
  // isCus: true,
  // element: ModalImages
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
  isViews: true,
  type: iconTypeEvent.delete,
  onClick: EventClickButton()
}

export const dynamicFucEvent = (to?: string, key?: string, callBack?: (str: string) => string) => {
  let str = sliceRouteDynamic(to || "")
  if(callBack) {
    str = callBack(str)
  }
  return [{ ...EditFuc, to: str , key: key || "alias" }, DeteleFuc]
}

export const configDefaultEvent: typeEvent[] = [EditFuc, DeteleFuc]
