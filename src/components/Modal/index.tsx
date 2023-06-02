import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, MouseEvent } from "react"
import Portal from "../Portal"

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  classAnimateIn?: string
  classAnimateOut?: string
  classModalWidth?: string
  isClose?: boolean
  opacity?: string
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  classAnimateIn,
  classAnimateOut,
  classModalWidth,
  isClose,
  opacity
}) => {
  const visbibleElement = useRef<HTMLDivElement | null>(null)
  const mainModal = useRef<HTMLDivElement | null>(null)
  const containerModal = useRef<HTMLDivElement | null>(null)
  const clearTimeClassIn = useRef<ReturnType<typeof setTimeout>>()
  classAnimateIn = classAnimateIn ?? "zoomin"
  classAnimateOut = classAnimateOut ?? "zoomout"
  opacity = opacity ?? "opacity-50"

  const clearAnimation = (parentModal: HTMLDivElement, opacityModal: HTMLDivElement, contenModal: HTMLDivElement) => {
    const clear = () => {
      contenModal.removeEventListener("transitionend", clear)
      parentModal.style.display = "none"
      opacityModal.classList.remove(`${opacity}`)
    }
    if (parentModal && opacityModal && contenModal) {
      if (contenModal.classList.contains(`${classAnimateIn}`)) {
        contenModal.classList.remove(`${classAnimateIn}`)
        contenModal.addEventListener("transitionend", clear)
      } else {
        parentModal.style.display = "none"
      }
    }
  }

  const VisbOpacity = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.target
    const elementContainer = mainModal.current

    if (element && elementContainer) {
      if (!isClose) {
        setIsOpen((prev) => !prev)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      if (containerModal.current) {
        clearTimeClassIn.current = setTimeout(() => {
          mainModal.current?.classList.add(`${classAnimateIn}`)
          visbibleElement.current?.classList.add(`${opacity}`)
        })
        containerModal.current.style.removeProperty("display")
      }
    } else {
      if (containerModal.current && visbibleElement.current && mainModal.current) {
        clearAnimation(containerModal.current, visbibleElement.current, mainModal.current)
      }
    }

    return () => {
      clearTimeClassIn.current && clearTimeout(clearTimeClassIn.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Portal>
      <div
        className="font-sans fixed bottom-0 top-0 inset-x-0 px-4 pb-4 inset-0 flex items-center justify-center z-[2000]"
        ref={containerModal}
      >
        <div
          className="fixed inset-0 transition-opacity opacity-0  duration-200"
          ref={visbibleElement}
          onClick={VisbOpacity}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className={`bg-white rounded-lg overflow-hidden shadow-xl relative z-10 sm:max-w-lg sm:w-full transition-transform ${classAnimateOut} duration-300 ${classModalWidth}`}
          ref={mainModal}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
