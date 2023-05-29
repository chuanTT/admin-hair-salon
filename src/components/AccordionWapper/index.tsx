import { useCallback, useRef, useState, FC, MutableRefObject, useEffect } from "react"
import { decrementHeight, requestAnimationFrameAccordion } from "@/common/functions"

export interface AccordionWapperProps {
  children: (obj: {
    refButton: MutableRefObject<HTMLDivElement | null>
    refContent: MutableRefObject<HTMLDivElement | null>
    active?: boolean
    toggleAccordion?: () => void
  }) => JSX.Element
  customProgressOpen?: (element: HTMLDivElement | null | undefined) => void
  customFucOpenDone?: (element: HTMLDivElement | null) => void
  customFucCloseDone?: (element: HTMLDivElement | null) => void
  callBackUpdate?: (toggleAccordion: () => void, active: boolean) => void
  isUpdate?: boolean
}

const AccordionWapper: FC<AccordionWapperProps> = ({
  children,
  customFucOpenDone,
  customFucCloseDone,
  customProgressOpen,
  callBackUpdate,
  isUpdate
}) => {
  const [active, setActive] = useState(false)
  const accordionContentRef = useRef<HTMLDivElement | null>(null)
  const divActive = useRef<HTMLDivElement | null>(null)

  const expandAccordion = useCallback(() => {
    if (accordionContentRef.current) {
      const element: HTMLDivElement = accordionContentRef.current

      element.style.transition = "height .3s ease"
      const height = element.scrollHeight
      element.style.height = `${height}px`
      typeof customProgressOpen === "function" && customProgressOpen(element)

      element.ontransitionend = () => {
        element.style.transition = ""
        typeof customFucOpenDone === "function" && customFucOpenDone(element)
        element.onanimationend = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const collapseAccordion = useCallback(() => {
    if (accordionContentRef.current) {
      const element: HTMLDivElement = accordionContentRef.current

      element.style.transition = "height .3s ease"
      element.style.height = `0px`

      element.ontransitionend = () => {
        element.style.transition = ""
        typeof customFucCloseDone === "function" && customFucCloseDone(element)
        element.onanimationend = null
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateUi = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        expandAccordion()
      } else {
        collapseAccordion()
      }
    },
    [expandAccordion, collapseAccordion]
  )

  const toggleAccordion = useCallback(() => {
    const expanded = !active

    updateUi(expanded)
    setActive(expanded)
  }, [active, updateUi])

  useEffect(() => {
    if (typeof callBackUpdate === "function") {
      callBackUpdate(toggleAccordion, active)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  return <>{children({ refButton: divActive, active, toggleAccordion, refContent: accordionContentRef })}</>
}

export default AccordionWapper
