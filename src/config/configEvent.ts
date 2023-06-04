import { sliceRouteDynamic } from "@/common/functions"
import { iconTypeEvent } from "@/components/Button"
import { typeEvent, typeEventClick } from "@/types"
import config from "."

export const EditFuc: typeEvent = {
  id: "edit",
  content: "Chỉnh sửa",
  customClass: "text-slate-400 hover:text-slate-500",
  key: "id",
  isViews: true,
  type: iconTypeEvent.edit,
  to: sliceRouteDynamic(config.router.editUser)
}

export const DeteleFuc: typeEvent = {
  id: "delete",
  content: "Xóa",
  customClass: "text-rose-500 hover:text-rose-600",
  key: "id",
  isViews: true,
  type: iconTypeEvent.delete,
  onClick: ({ id, provider }: typeEventClick) => {
    if (provider) {
      const { handelDelete } = provider
      if (typeof handelDelete === "function") {
        handelDelete(id)
      }
    }
  }
}

export const dynamicFucEvent = (to?: string, key?: string) => {
  return [{ ...EditFuc, to: sliceRouteDynamic(to || ""), key: key || "alias" }, DeteleFuc]
}

export const configDefaultEvent: typeEvent[] = [EditFuc, DeteleFuc]
