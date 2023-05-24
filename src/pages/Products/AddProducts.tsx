import { useRef } from "react"
import * as Yup from "yup"

import Breadcrumb from "@/components/Breadcrumb"
import Button from "@/components/Button"
import { InputField, InputPriceField, ReactSelectCus, TextArea } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import useFethingOptionApi from "@/hooks/useFetchingOptionApi"
import { getRoles, tableRole } from "@/api/rolesApi"
import { funcKeyRole } from "@/common/ConfigSelectOption"
import TextEditor from "@/components/CustomField/TextEditor"
import { addProductApi } from "@/api/productApi"
import SendFormData from "@/components/FormHandel/SendFormData"

const schema = Yup.object().shape({
  // name: Yup.string().required("Vui lòng nhập họ và tên"),
  // user_name: Yup.string().required("Vui lòng nhập tên đăng nhập"),
})

const AddProducts = () => {
  const ImgRef = useRef<refListImage>(null)
  const { option: optionRole } = useFethingOptionApi({
    CallAPi: getRoles,
    nameTable: tableRole,
    customFucKey: funcKeyRole,
    customUrlOption: ({ query, limit, nameTable, page }) => {
      return query?.for(nameTable)?.limit(limit).page(page).sort("1")
    }
  })
  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={addProductApi}
        closeFuncSucc={({ remove, propForm }) => {
          typeof remove === "function" && remove()
          propForm && propForm.reset()
          ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
        }}
        customValuesData={(value) => {
          return SendFormData(value)
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
                  title="Tên sản phấm"
                  placeholder="Nhập tên sản phẩm"
                  name="name"
                  register={register}
                  isRequire
                  isError
                  errors={errors}
                />

                <ReactSelectCus
                  title="Trạng thái"
                  parenSelect="mb-3 col-md-6"
                  placeholder="Chọn trạng thái"
                  name="status"
                  options={optionRole}
                  getValue={getValues}
                  setValue={setValue}
                />

                <ReactSelectCus
                  title="Giá cả"
                  parenSelect="mb-3 col-md-6"
                  placeholder="Chọn giá cả"
                  name="isNegotiate"
                  options={optionRole}
                  getValue={getValues}
                  setValue={setValue}
                  isRequire
                />

                <InputPriceField
                  title="Nhập giá tiền"
                  classInput="col-md-6 mb-3"
                  placeholder="Nhập giá tiền"
                  name="price"
                  register={register}
                />

                <TextArea
                  classAreaContainer="col-md-12 mb-3"
                  name="short_content"
                  register={register}
                  title="Nội dung ngắn"
                  placeholder="Nhập nội dung ngắn"
                  rows={10}
                  isRequire
                />

                <ListImagesUploadFile
                  classParentImg="mb-3"
                  ref={ImgRef}
                  setValue={setValue}
                  title="Hình ảnh đại diện (tối đa 10 hình ảnh)"
                  name="thumb"
                  register={register}
                  isMultiple
                />

                <TextEditor
                  classAreaContainer="col-md-12 mb-3"
                  title="Mô tả sản phẩm"
                  placeholder="Nhập mô tả sản phẩm"
                  name="description"
                  setValue={setValue}
                  isRequire
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  isPending={isPending}
                  customClass="font-bold py-2 px-4 border !rounded bg-blue-icon bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Thêm
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

export default AddProducts
