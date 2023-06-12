import { Event, defaultProps } from "@/types"
import { FC } from "react"

interface PermissonCheckLayoutProps extends defaultProps {
  event: Event
}

const PermissonCheckLayout: FC<PermissonCheckLayoutProps> = ({ children, event }) => {
  
  return <>{children}</>
}

export default PermissonCheckLayout
