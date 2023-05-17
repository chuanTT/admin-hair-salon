import { iconTypeEvent } from "@/components/Button"
import { typeEvent, typeEventClick } from "@/types"

export const EditFuc: typeEvent = {
  id: "edit",
  content: "Chỉnh sửa",
  customClass: "text-slate-400 hover:text-slate-500",
  key: "id",
  isViews: true,
  type: iconTypeEvent.edit
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

export const configDefaultEvent: typeEvent[] = [EditFuc, DeteleFuc]
