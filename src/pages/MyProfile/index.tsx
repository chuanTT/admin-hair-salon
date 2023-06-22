import * as Yup from "yup"
import { isEmptyObj } from "@/common/functions"
import Breadcrumb from "@/components/Breadcrumb"
import { InputField } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { UpdateUser, getMeApi } from "@/api/usersApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import { useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const schema = Yup.object().shape({
  full_name: Yup.string().required("Vui lòng nhập họ và tên"),
  user_name: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  email: Yup.string().email("Email không đúng định dạng")
})

enum UserValue {
  avatar = "avatar",
  full_name = "full_name",
  user_name = "user_name",
  phone = "phone",
  email = "email"
}

const defaultValues = {
  avatar: "",
  full_name: "",
  user_name: "",
  phone: "",
  email: ""
}

const MyProfile = () => {
  const [, setIsUpdated] = useState(false)
  const ImgRef = useRef<refListImage>(null)
  const QueryClient = useQueryClient()

  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={(result) => UpdateUser(result?.id, result?.data)}
        closeFuncSucc={({ remove, propForm }) => {
          typeof remove === "function" && remove()
          propForm && propForm.reset()
          ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
          QueryClient.invalidateQueries(["verify-token"])
        }}
        customValuesData={(value, result) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { avatar, ...spread } = value
          let data = {
            ...spread
          }

          if (!isEmptyObj(avatar)) {
            data = { ...data, avatar }
            data = SendFormData(data)
          }

          return {
            data,
            id: result?.data?.id
          }
        }}
        customValue={({ data, key }) => {
          if (key === UserValue.avatar) {
            if (ImgRef.current) {
              ImgRef.current?.setSrc?.(data[key] ?? "")
            }
            setIsUpdated((prev) => !prev)
            return true
          }
        }}
        defaultValues={defaultValues}
        isEdit
        id={1}
        nameTable="me"
        callApiEdit={getMeApi}
        customUrl={({ query, nameTable }) => {
          return query?.for(nameTable)?.url()
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
                readOnly
                disabled
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
