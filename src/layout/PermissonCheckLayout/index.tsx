import { Event, defaultProps } from "@/types"
import { FC, useEffect } from "react"
import { usePermissions } from "../PermissonLayout"
import { useNavigate } from "react-router-dom"
import config from "@/config"

interface PermissonCheckLayoutProps extends defaultProps {
  event: Event
  role?: string | string[]
}

const PermissonCheckLayout: FC<PermissonCheckLayoutProps> = ({ children, event, role }) => {
  const { checkEvent, nameRole } = usePermissions()
  const navigate = useNavigate()

  useEffect(() => {
    if (checkEvent) {
      const check = checkEvent && checkEvent?.[event]

      let checkRole = false
      if (Array.isArray(role) && nameRole) {
        checkRole = role?.includes(nameRole)
      } else if (nameRole && role) {
        checkRole = role === nameRole
      } else {
        checkRole = true
      }

      if (!checkRole || !check) {
        navigate(config.router[403])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, checkEvent])

  return <>{children}</>
}

export default PermissonCheckLayout
