import { useEffect, useState } from "react"
import { useLocalstorageState } from "rooks"
import * as Yup from "yup"
import Button from "@/components/Button"
import FormHandel from "@/components/FormHandel"
import { InputField } from "@/components/CustomField"
import { LoginApi } from "@/api/authApi"
import { useNavigate } from "react-router-dom"
import config from "@/config"
import { AUTH_LS_KEY } from "@/constants/LocalStorage"
import "@/assets/css/pages/page-auth.css"

const schema = Yup.object().shape({
  account: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: Yup.string().required("Vui lòng nhập mật khẩu")
})

const Login = () => {
  const [auth, setAuth] = useLocalstorageState(AUTH_LS_KEY, "")
  const [isLoged, setIsLoged] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoged || auth) {
      navigate(config.router.home)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged, auth])

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo"></span>
                  <span className="app-brand-text demo text-body fw-bolder">Hair Salon</span>
                </a>
              </div>

              <h4 className="mb-2 text-center">Phần Mềm Quản Lý</h4>
              <p className="mb-4">Vui lòng đăng nhập tài khoản của bạn</p>

              <FormHandel
                msgObj={{ erorr: "Đăng nhập thất bại", suss: "Đăng nhập thành công" }}
                sussFuc={(data) => {
                  if (data?.data) {
                    setAuth(data?.data?.token)
                    setIsLoged(true)
                  }
                }}
                closeFuncSucc={({ propForm }) => {
                  if (propForm?.reset) {
                    propForm?.reset()
                  }
                }}
                errorFuc={(reset) => {
                  if (typeof reset === "function") {
                    reset({
                      password: ""
                    })
                  }
                }}
                schema={schema}
                isValidate
                callApi={LoginApi}
                removeClassForm
                ClassForm="mb-3"
              >
                {({ propForm, isPending }) => {
                  const {
                    register,
                    formState: { errors }
                  } = propForm
                  return (
                    <>
                      <InputField
                        classInputContainer="mb-3"
                        isRequire
                        name="account"
                        placeholder="Nhập tên đăng nhập"
                        register={register}
                        title="Tên đăng nhập"
                        errors={errors}
                      />
                      <InputField
                        type="password"
                        classInputContainer="mb-3"
                        isRequire
                        name="password"
                        register={register}
                        title="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        errors={errors}
                      />

                      <div className="mt-5">
                        <Button isPending={isPending} customClass="bg-blue-600 text-white px-5 py-2 w-full !rounded-md">
                          Đăng nhập
                        </Button>
                      </div>
                    </>
                  )
                }}
              </FormHandel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
