import { useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { UpdateProductSlider } from "@/api/productApi"
import SwitchRadio from "@/components/CustomField/SwitchRadio"
import { typeElment, typeObject } from "@/types"
import ToastCustom, { TypeToast } from "@/components/ToastCustom"
import { MsgType } from "@/common/functions"

const UpdateShowSlider = ({ current }: typeElment) => {
  const [isShowToast, setIsShowToast] = useState(false)
  const msgObj = useRef({ title: "", type: TypeToast.WARN })
  const { mutate } = useMutation({
    mutationFn: (value: string | number | typeObject) => {
      return UpdateProductSlider(current?.id, value)
    },

    onError: () => {
      msgObj.current = MsgType("Lỗi không xác định")
      setIsShowToast(true)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      if (context?.code === 402 || context?.code === 400) {
        msgObj.current = MsgType(context?.msg ?? "Thêm thất bại")
      } else if (context?.code === 422) {
        msgObj.current = MsgType("Thêm thất bại")
      } else {
        msgObj.current = MsgType(context?.msg ?? "Thêm thành công", false)
      }
      setIsShowToast(true)
    }
  })
  const isShow = current?.is_show === 1 ? true : false

  return (
    <ToastCustom
      isOpenToast={isShowToast}
      title={msgObj.current.title}
      type={msgObj.current.type}
      CloseEvent={() => setIsShowToast(false)}
    >
      <div className="flex justify-center items-center">
        <SwitchRadio
          isCheck={isShow}
          ClickRadio={(checked) => {
            mutate({ is_show: checked ? 1 : "0" })
          }}
          classChecked="#4f46e5"
        />
      </div>
    </ToastCustom>
  )
}

export default UpdateShowSlider
