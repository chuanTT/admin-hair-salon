import { useRef } from "react"
import * as Yup from "yup"
import { AddUser as AddUserApi } from "@/api/usersApi"
import Breadcrumb from "@/components/Breadcrumb"
import Button from "@/components/Button"
import { InputField, ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import useFethingOptionApi from "@/hooks/useFetchingOptionApi"
import { getRoles, tableRole } from "@/api/rolesApi"
import { funcKeyRole } from "@/common/ConfigSelectOption"
import ButtonLoading from "@/components/ButtonLoading"

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

const AddUser = () => {
  const ImgRef = useRef<refListImage>(null)
  const { option: optionRole } = useFethingOptionApi({
    CallAPi: getRoles,
    nameTable: tableRole,
    customFucKey: funcKeyRole,
    customUrlOption: ({ query, limit, nameTable, page }) => {
      return query?.for(nameTable)?.limit(limit).page(page).sort('1')
    }
  })
  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={AddUserApi}
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
      >
        {({ propForm, isPending }) => {
          const {
            register,
            reset,
            setValue,
            getValues,
            formState: { errors }
          } = propForm

          return (
            <>
              <div className="row">
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

                <InputField
                  type="password"
                  classInputContainer="col-md-6 mb-3"
                  title="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  register={register}
                  isRequire
                  isError
                  errors={errors}
                />

                <InputField
                  type="password"
                  classInputContainer="col-md-6 mb-3"
                  title="Xác nhận mật khẩu"
                  placeholder="Nhập xác nhận mật khẩu"
                  name="confirm_password"
                  register={register}
                  isRequire
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
              </div>

              <div className="flex items-center space-x-2">
                <ButtonLoading isPending={isPending} isPrimary>
                  Thêm
                </ButtonLoading>

                <ButtonLoading onClick={(e) => {
                  e.preventDefault()
                  reset()
                }}>
                  Hủy
                </ButtonLoading>
              </div>
            </>
          )
        }}
      </FormHandel>
    </Breadcrumb>
  )
}

export default AddUser
