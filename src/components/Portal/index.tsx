import { defaultProps } from "@/types"
import { FC } from "react"
import { createPortal } from "react-dom"

const Portal: FC<defaultProps> = ({ children }) => {
  return createPortal(children, document.body)
}

export default Portal
