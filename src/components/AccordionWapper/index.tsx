import { useCallback, useRef, useState, FC, MutableRefObject } from "react"
import { decrementHeight, incrementHeight, requestAnimationFrameAccordion } from "@/common/functions"

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
}

const AccordionWapper: FC<AccordionWapperProps> = ({
  children,
  customFucOpenDone,
  customFucCloseDone,
  customProgressOpen
}) => {
  const [active, setActive] = useState(false)
  const accordionContentRef = useRef<HTMLDivElement | null>(null)
  const divActive = useRef<HTMLDivElement | null>(null)

  const expandAccordion = useCallback(() => {
    if (accordionContentRef.current) {
      const element: HTMLDivElement = accordionContentRef.current
      requestAnimationFrameAccordion({
        element,
        callBackDone: () => {
          element.style.height = "auto"
          element.style.overflow = "initial"
          typeof customFucOpenDone === "function" && customFucOpenDone(element)
        },
        callProgress: (process, element) => {
          incrementHeight(process, element)
          typeof customProgressOpen === "function" && customProgressOpen(element)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const collapseAccordion = useCallback(() => {
    if (accordionContentRef.current) {
      const element: HTMLDivElement = accordionContentRef.current
      requestAnimationFrameAccordion({
        element,
        callBackDone: () => {
          element.style.height = ""
          element.style.overflow = ""
          element.style.padding = ""
          typeof customFucCloseDone === "function" && customFucCloseDone(element)
        },
        callProgress: (process, element) => {
          decrementHeight(process, element)
        }
      })
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

  return <>{children({ refButton: divActive, active, toggleAccordion, refContent: accordionContentRef })}</>
}

export default AccordionWapper
