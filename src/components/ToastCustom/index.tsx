import { FC, ReactNode, useEffect } from "react"
import { toast, ToastOptions } from "react-toastify"

export enum TypeToast {
  SUCCESS = "success",
  ERROR = "error",
  WARN = "warn"
}

interface ToastCustomProps {
  children?: ReactNode
  title?: string
  isOpenToast?: boolean
  type?: TypeToast
  timeEnd?: number
  CloseEvent?: () => void
}

const ToastCustom: FC<ToastCustomProps> = ({ children, title, isOpenToast, type, timeEnd, CloseEvent, ...option }) => {
  useEffect(() => {
    const options: ToastOptions = {
      ...option,
      position: "top-right",
      autoClose: timeEnd || 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        typeof CloseEvent === "function" && CloseEvent()
      }
    }

    if (isOpenToast) {
      if (title) {
        switch (type) {
          case TypeToast.SUCCESS:
            toast.success(title, options)
            break
          case TypeToast.ERROR:
            toast.error(title, options)
            break
          case TypeToast.WARN:
            toast.warn(title, options)
            break
          default:
            break
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenToast])

  return <>{children}</>
}
export default ToastCustom
