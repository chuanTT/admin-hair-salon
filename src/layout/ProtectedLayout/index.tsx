import { useNavigate } from "react-router-dom"
import config from "@/config"
import { FC, createContext, useContext, useEffect, useMemo, useState } from "react"
import { dataInter, dataProvider, defaultProps, userProps } from "@/types"
import { lsRemoveAuth } from "@/common/functions"
import { LogoutApi } from "@/api/authApi"

const protectedLayoutContext = createContext({})

interface ProtectedLayoutProps extends defaultProps {
  userData?: userProps
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children, userData }) => {
  const [user, setUser] = useState(userData ?? {})
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.id) {
      navigate(config.router.login)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const removeAuth = async () => {
    const data: dataInter = await LogoutApi()
    if (data?.code === 200) {
      setUser({})
      lsRemoveAuth()
      navigate("/login", { replace: true })
    }
  }

  const value = useMemo(
    () => ({
      setUser,
      user,
      removeAuth
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return <protectedLayoutContext.Provider value={value}>{children}</protectedLayoutContext.Provider>
}

export const useProtectedLayout = () => {
  const data: dataProvider = useContext(protectedLayoutContext)

  return data
}

export default ProtectedLayout
