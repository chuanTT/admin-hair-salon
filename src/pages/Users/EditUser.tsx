import { useRef } from "react"
import * as Yup from "yup"
import { AddUser as AddUserApi, getUser, tableUser } from "@/api/usersApi"
import Breadcrumb from "@/components/Breadcrumb"
import Button from "@/components/Button"
import { InputField } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { useParams } from "react-router-dom"

const schema = Yup.object().shape({
  full_name: Yup.string().required("Vui lòng nhập họ và tên"),
  user_name: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 ký tự"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
})

const defaultValues = {
  avatar: "avatar",
  full_name: "full_name",
  user_name: "user_name"
}

const EditUser = () => {
  const { id } = useParams()
  console.log(id)
  const ImgRef = useRef<refListImage>(null)

  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={AddUserApi}
        closeFuncSucc={({ remove, propForm }) => {
          typeof remove === "function" && remove()
          propForm && propForm.reset()
          ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
        }}
        defaultValues={defaultValues}
        isEdit
        nameTable={tableUser}
        id={id}
        callApiEdit={getUser}
      >
        {({ propForm, isPending }) => {
          const {
            register,
            reset,
            setValue,
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
                  readOnly
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
                <Button
                  isPending={isPending}
                  customClass="font-bold py-2 px-4 border !rounded bg-blue-icon bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Chỉnh sửa
                </Button>

                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    reset()
                  }}
                  customClass="bg-white border-solid text-black font-bold py-2 px-4 border !rounded "
                >
                  Hủy
                </Button>
              </div>
            </>
          )
        }}
      </FormHandel>
    </Breadcrumb>
  )
}

export default EditUser
