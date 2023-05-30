import { Suspense } from "react"
import { Await, Navigate, useLoaderData, useOutlet } from "react-router-dom"
import Loading from "@/components/Loading"
import { dataInter } from "@/types"
import ProtectedLayout from "../ProtectedLayout"
import DefaultLayout from "../DefaultLayout"

const AuthLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userPromise } = useLoaderData() as { userPromise: any }
  const outlet = useOutlet()

  return (
    <Suspense fallback={<Loading isCenterScreen/>}>
      <Await resolve={userPromise} errorElement={<Navigate to="/login" replace={true} />}>
        {(userData: dataInter) => {
          return (
            <ProtectedLayout userData={userData?.data}>
              <DefaultLayout>{outlet}</DefaultLayout>
            </ProtectedLayout>
          )
        }}
      </Await>
    </Suspense>
  )
}

export default AuthLayout
