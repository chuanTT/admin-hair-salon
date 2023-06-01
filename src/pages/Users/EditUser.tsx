import { useRef } from "react"
import * as Yup from "yup"
import { UpdateUser, getUser, tableUser } from "@/api/usersApi"
import Breadcrumb from "@/components/Breadcrumb"
import { InputField, ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { useParams } from "react-router-dom"
import useFethingOptionApi from "@/hooks/useFetchingOptionApi"
import { isEmptyObj } from "@/common/functions"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { configRoleApi } from "@/config/configCallApi"

const schema = Yup.object().shape({
  full_name: Yup.string().required("Vui lòng nhập họ và tên"),
  user_name: Yup.string().required("Vui lòng nhập tên đăng nhập")
})

const defaultValues = {
  avatar: "avatar",
  full_name: "full_name",
  user_name: "user_name",
  phone: "phone",
  email: "email",
  role_id: "role_id"
}

const EditUser = () => {
  const { id } = useParams()
  const ImgRef = useRef<refListImage>(null)
  const { option: optionRole } = useFethingOptionApi({
    ...configRoleApi
  })

  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={(data) => UpdateUser(id ?? 0, data)}
        defaultValues={defaultValues}
        isEdit
        nameTable={tableUser}
        id={id}
        callApiEdit={getUser}
        customValue={({ data, key }) => {
          if (key === defaultValues.avatar) {
            if (ImgRef.current) {
              ImgRef.current?.setSrc?.(data[key] ?? "")
            }
            return true
          }
        }}
        customValuesData={(value) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { user_name, avatar, ...spread } = value
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
            getValues,
            formState: { errors }
          } = propForm
          return (
            <LayoutFormDefault
              isPending={isPending}
              txtButtonPrimary="Chỉnh sửa"
              clickButtonCancel={() => {
                clearErrors()
                typeof setResertForm === "function" && setResertForm((prev) => !prev)
              }}
            >
              <InputField
                classInputContainer="col-md-6 mb-3"
                title="Họ và tên"
                placeholder="Nhập họ và tên"
                name="full_name"
                register={register}
                isRequire
                isError
                errors={errors}
              />

              <InputField
                classInputContainer="col-md-6 mb-3"
                title="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                name="user_name"
                register={register}
                isRequire
                isError
                errors={errors}
                readOnly
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
                isError
                errors={errors}
              />

              <ReactSelectCus
                title="Vai trò"
                parenSelect="mb-3 col-md-12"
                placeholder="Chọn vai trò"
                name="role_id"
                options={optionRole}
                getValue={getValues}
                setValue={setValue}
              />

              <ListImagesUploadFile
                ref={ImgRef}
                setValue={setValue}
                title="Hình ảnh đại diện"
                name="avatar"
                register={register}
              />
            </LayoutFormDefault>
          )
        }}
      </FormHandel>
    </Breadcrumb>
  )
}

export default EditUser
