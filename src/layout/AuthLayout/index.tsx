import { Await, Navigate, useLoaderData } from "react-router-dom"
import { FC, Suspense } from "react"
import Loading from "@/components/Loading"
import { dataInter, defaultProps } from "@/types"
import ProtectedLayout from "../ProtectedLayout"
import DefaultLayout from "../DefaultLayout"

const AuthLayout: FC<defaultProps> = ({children}) => {
  const userPromise = useLoaderData()

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={userPromise} errorElement={<Navigate to="/login" replace={true} />}>
        {(userData: dataInter) => {
          return (
            <ProtectedLayout userData={userData?.data}>
              <DefaultLayout>
                {children}
              </DefaultLayout>
            </ProtectedLayout>
          )
        }}
      </Await>
    </Suspense>
  )
}

export default AuthLayout
