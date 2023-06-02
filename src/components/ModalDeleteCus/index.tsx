import { useState, useRef, FC, Dispatch, SetStateAction } from "react"
import { AxiosResponse } from "axios"
import { useMutation } from "@tanstack/react-query"
// import Modal from "./Modal";
// import ToastCustom from "./ToastCustom";
// import Button from "./ButtonToolTip";
import ToastCustom, { TypeToast } from "../ToastCustom"
import Modal from "../Modal"
import { MsgType } from "@/common/functions"
import Button from "../Button"

interface ModalDeleteCusProps {
  isOpen: boolean
  id: (string | number)[]
  setIsOpen: Dispatch<SetStateAction<boolean>>
  closeToastEvent?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApiDelete: (data: (string | number)[], is_force?: number | string) => Promise<AxiosResponse<any, any>>
  msgObj?: {
    erorr?: string
    suss?: string
  }
  onSuccessModal?: () => void
  SuccessModal?: () => void
  sussFucMsg?: () => void
  is_force?: number | string
}

const ModalDeleteCus: FC<ModalDeleteCusProps> = ({
  isOpen,
  id,
  setIsOpen,
  closeToastEvent,
  callApiDelete,
  msgObj,
  onSuccessModal,
  SuccessModal,
  sussFucMsg,
  is_force
}) => {
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const msgToast = useRef({ title: "", type: TypeToast.WARN })

  const resetPending = () => {
    setIsPending(false)
    setIsOpenToast(true)
    setIsOpen(false)
  }

  // delete
  const { mutate } = useMutation({
    mutationFn: (values: (string | number)[]) => {
      return callApiDelete(values, is_force)
    },
    onError: () => {
      msgToast.current = MsgType(msgObj?.erorr ?? "Xóa thất bại")
      resetPending()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      msgToast.current = MsgType(msgObj?.suss ?? "Xóa thành công", false)
      if (context) {
        if (context?.code === 400 || context?.code === 403) {
          msgToast.current = MsgType(context?.msg ?? msgObj?.erorr ?? "Xóa thất bại")
        }
      }

      msgToast.current.type === TypeToast.SUCCESS && typeof SuccessModal == "function" && SuccessModal()
      typeof onSuccessModal == "function" && onSuccessModal()
      resetPending()
    }
  })

  const submitDelete = () => {
    if (typeof callApiDelete === "function") {
      mutate(id)
      setIsPending(true)
    }
  }

  return (
    <ToastCustom
      isOpenToast={isOpenToast}
      title={msgToast.current.title}
      type={msgToast.current.type}
      timeEnd={1000}
      CloseEvent={() => {
        setIsOpenToast(false)
        if (closeToastEvent) {
          closeToastEvent()
        }
        if (msgToast.current.type === TypeToast.SUCCESS) {
          typeof sussFucMsg == "function" && sussFucMsg()
        }
      }}
    >
      <Modal classModalWidth="max-sm:w-[90%]" isOpen={isOpen} setIsOpen={setIsOpen} isClose={isPending}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Thông báo</h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">Bạn có chắc chắn muốn xóa không?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex max-sm:justify-center flex-row-reverse gap-2">
          <span className="flex rounded-md shadow-sm sm:w-fit">
            <Button
              customClass="font-bold py-2 px-4 border !rounded bg-red-600 hover:bg-red-500 text-white max-sm:min-w-[88px]"
              aria-hidden="true"
              onClick={(e) => {
                e.preventDefault()
                !isPending && setIsOpen((prev) => !prev)
              }}
            >
              Huỷ
            </Button>
          </span>
          <span className="flex rounded-md shadow-sm sm:mt-0 sm:w-fit ">
            <Button
              isPending={isPending}
              onClick={submitDelete}
              customClass="flex items-center space-x-2  font-bold py-2 px-4 border !rounded bg-blue-icon bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Đồng ý
            </Button>
          </span>
        </div>
      </Modal>
    </ToastCustom>
  )
}

export default ModalDeleteCus
