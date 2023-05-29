import { Suspense } from "react"
import { Await, Navigate, useLoaderData, useOutlet } from "react-router-dom"
import Loading from "@/components/Loading"
import { dataInter } from "@/types"
import ProtectedLayout from "../ProtectedLayout"
import DefaultLayout from "../DefaultLayout"


const AuthLayout = () => {
  const userPromise = useLoaderData()
  const outlet = useOutlet()

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center [&>*]:scale-50 fixed inset-0">
          <Loading />
        </div>
      }
    >
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
