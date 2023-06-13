import { useRef, useState } from "react"
import * as Yup from "yup"

import Breadcrumb from "@/components/Breadcrumb"
import { InputField, InputPriceField, ReactSelectCus, TextArea } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import TextEditorCustom, { refTextEditor } from "@/components/CustomField/TextEditor"
import { addProductApi } from "@/api/productApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import { convertNumber } from "@/common/functions"
import { RefType } from "@/components/CustomField/InputPriceField"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { options, optionsStatus } from "@/common/optionStatic"
import config from "@/config"
import { Event } from "@/types"
import PermissonCheckLayout from "@/layout/PermissonCheckLayout"

const schema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập họ và tên"),
  short_content: Yup.string().required("Vui lòng nhập nội dung ngắn"),
  description: Yup.string().required("Vui lòng nhập mô tả"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  price: Yup.string().when("$showPrice", (showPrice: any, schema?: any) => {
    if (showPrice?.[0]) {
      return schema.required("Vui lòng nhập giá")
    }
    return
  })
})

const defaultValue = {
  isNegotiate: 0,
  status: 1
}

const AddProducts = () => {
  const ImgRef = useRef<refListImage>(null)
  const PriceRef = useRef<RefType>(null)
  const textEditorRef = useRef<refTextEditor>(null)
  const [showPrice, setShowPrice] = useState(true)

  return (
    <PermissonCheckLayout event={Event.CREATE}>
      <Breadcrumb>
        <FormHandel
          isValidate
          schema={schema}
          optionValidateRest={{
            context: {
              showPrice
            }
          }}
          defaultValues={defaultValue}
          callApi={addProductApi}
          closeFuncSucc={({ remove, propForm }) => {
            typeof remove === "function" && remove()
            propForm && propForm.reset()
            ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
            textEditorRef?.current && textEditorRef?.current?.clearValue()
            PriceRef?.current && PriceRef?.current?.clearValue?.()
          }}
          customValuesData={(value) => {
            const { price, thumb, ...spread } = value
            const { value: cvPrice } = convertNumber(price)
            const isNegotiate = spread?.isNegotiate === 0 ? "0" : spread?.isNegotiate

            const data = {
              ...spread,
              price: cvPrice === 0 ? "0" : cvPrice,
              isNegotiate
            }

            const formData = SendFormData(data)
            config.formDataFile(thumb, formData)

            return formData
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
              <LayoutFormDefault
                isPending={isPending}
                clickButtonCancel={() => {
                  reset()
                }}
              >
                <InputField
                  classInputContainer="col-md-6 mb-3"
                  title="Tên sản phấm"
                  placeholder="Nhập tên sản phẩm"
                  name="name"
                  register={register}
                  isRequire
                  errors={errors}
                />

                <ReactSelectCus
                  title="Trạng thái"
                  parenSelect="mb-3 col-md-6"
                  placeholder="Chọn trạng thái"
                  name="status"
                  options={optionsStatus}
                  getValue={getValues}
                  setValue={setValue}
                />

                <ReactSelectCus
                  title="Giá cả"
                  parenSelect={`mb-3 ${showPrice ? "col-md-6" : ""} `}
                  placeholder="Chọn giá cả"
                  name="isNegotiate"
                  options={options}
                  getValue={getValues}
                  setValue={setValue}
                  isRequire
                  changeSelected={(option) => {
                    const { value } = option
                    setShowPrice(value === 0 ? true : false)
                  }}
                />
                {showPrice && (
                  <InputPriceField
                    title="Nhập giá tiền"
                    classInput="col-md-6 mb-3"
                    placeholder="Nhập giá tiền"
                    name="price"
                    isRequire
                    register={register}
                    ref={PriceRef}
                    errors={errors}
                  />
                )}

                <TextArea
                  classAreaContainer="col-md-12 mb-3"
                  name="short_content"
                  register={register}
                  title="Nội dung ngắn"
                  placeholder="Nhập nội dung ngắn"
                  rows={10}
                  isRequire
                  errors={errors}
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

                <TextEditorCustom
                  classAreaContainer="col-md-12 mb-3"
                  title="Mô tả sản phẩm"
                  placeholder="Nhập mô tả sản phẩm"
                  name="description"
                  setValue={setValue}
                  isRequire
                  ref={textEditorRef}
                  errors={errors}
                />
              </LayoutFormDefault>
            )
          }}
        </FormHandel>
      </Breadcrumb>
    </PermissonCheckLayout>
  )
}

export default AddProducts
