import { useNavigate } from "react-router-dom"
import config from "@/config"
import { FC, createContext, useContext, useEffect } from "react"
import { RoleResponsive, defaultProps } from "@/types"
import useFetchingApi from "@/hooks/useFetchingApi"
import { verifyToken } from "@/api/authApi"
import Loading from "@/components/Loading"

const protectedLayoutContext = createContext({})

interface userProps {
  id?: number
  user_name?: string
  full_name?: string
  avatar?: string
  role?: RoleResponsive
}

interface valueProps {
  data?: userProps
}

export interface dataInter {
  code?: number
  msg?: string
  data?: userProps
}

const ProtectedLayout: FC<defaultProps> = ({ children }) => {
  const token = localStorage?.getItem("token")
  const navigate = useNavigate()

  if (!token) {
    navigate(config.router.login)
  }

  const { data, isFetched } = useFetchingApi({
    nameTable: "auth/verify-token",
    CallAPi: verifyToken,
    customUrl: ({ nameTable, query }) => {
      return query?.for(nameTable)?.url()
    }
  })

  useEffect(() => {
    if (data?.code === 401) {
      localStorage?.removeItem("token")
      navigate(config.router.login)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const values: valueProps = {
    data: data?.data as userProps
  }

  return (
    <protectedLayoutContext.Provider value={values}>
      {!isFetched && (
        <div className="flex justify-center items-center [&>*]:scale-50 fixed inset-0">
          <Loading />
        </div>
      )}
      {isFetched && children}
    </protectedLayoutContext.Provider>
  )
}

export const useProtectedLayout = () => {
  const data: valueProps = useContext(protectedLayoutContext)

  return data
}

export default ProtectedLayout
