import * as Yup from "yup"
import { isEmptyObj } from "@/common/functions"
import Breadcrumb from "@/components/Breadcrumb"
import { InputField } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { AddUser } from "@/api/usersApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import { useRef } from "react"

const schema = Yup.object().shape({
  full_name: Yup.string().required("Vui lòng nhập họ và tên"),
  user_name: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 ký tự"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
  email: Yup.string().email("Email không đúng định dạng")
})

const MyProfile = () => {
  const ImgRef = useRef<refListImage>(null)
  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={AddUser}
        errorFuc={(reset) => {
          typeof reset === "function" &&
            reset({
              password: "",
              confirm_password: ""
            })
        }}
        closeFuncSucc={({ remove, propForm }) => {
          typeof remove === "function" && remove()
          propForm && propForm.reset()
          ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
        }}
        customValuesData={(value) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { avatar, ...spread } = value
          let data = {
            ...spread
          }

          if (!isEmptyObj(avatar)) {
            data = { ...data, avatar }
            data = SendFormData(data)
          }

          return data
        }}
      >
        {({ propForm, isPending, setResertForm }) => {
          const {
            register,
            clearErrors,
            setValue,
            formState: { errors }
          } = propForm

          return (
            <LayoutFormDefault
              isPending={isPending}
              txtButtonPrimary="Cập nhật"
              clickButtonCancel={() => {
                clearErrors()
                typeof setResertForm === "function" && setResertForm((prev) => !prev)
              }}
            >
              <ListImagesUploadFile
                ref={ImgRef}
                setValue={setValue}
                title="Hình ảnh đại diện"
                name="avatar"
                register={register}
              />

              <hr className="!my-4 block" />

              <InputField
                classInputContainer="col-md-6 mb-3"
                title="Họ và tên"
                placeholder="Nhập họ và tên"
                name="full_name"
                register={register}
                isRequire
                errors={errors}
              />

              <InputField
                classInputContainer="col-md-6 mb-3"
                title="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                name="user_name"
                register={register}
                isRequire
                errors={errors}
              />

              <InputField
                classInputContainer="col-md-6 mb-3"
                title="Số điện thoại"
                placeholder="Nhập số điện thoại"
                name="phone"
                register={register}
              />

              <InputField
                classInputContainer="col-md-6 mb-3"
                title="Email"
                placeholder="Nhập địa chỉ email"
                name="email"
                register={register}
                errors={errors}
              />
            </LayoutFormDefault>
          )
        }}
      </FormHandel>
    </Breadcrumb>
  )
}

export default MyProfile
