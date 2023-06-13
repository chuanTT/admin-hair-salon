import { useRef, useState } from "react"
import * as Yup from "yup"
import Breadcrumb from "@/components/Breadcrumb"
import { InputField, ReactSelectCus, TextArea } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { useParams } from "react-router-dom"
import { isEmptyObj } from "@/common/functions"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { UpdateProduct, getProduct, tableProduct } from "@/api/productApi"
import TextEditorCustom, { refTextEditor } from "@/components/CustomField/TextEditor"
import InputPriceField, { RefType } from "@/components/CustomField/InputPriceField"
import { options, optionsStatus } from "@/common/optionStatic"
import config from "@/config"
import PermissonCheckLayout from "@/layout/PermissonCheckLayout"
import { Event } from "@/types"

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
export enum valueDefaultProduct {
  name = "name",
  thumb = "thumb",
  status = "status",
  isNegotiate = "isNegotiate",
  price = "price",
  short_content = "short_content",
  description = "description"
}

const defaultValues = {
  [valueDefaultProduct.name]: "",
  [valueDefaultProduct.thumb]: "",
  [valueDefaultProduct.status]: "",
  [valueDefaultProduct.isNegotiate]: "",
  [valueDefaultProduct.price]: "",
  [valueDefaultProduct.short_content]: "",
  [valueDefaultProduct.description]: ""
}

const EditProducts = () => {
  const { alias } = useParams()
  const [, setIsUpdated] = useState(false)
  const ImgRef = useRef<refListImage>(null)
  const PriceRef = useRef<RefType>(null)
  const textEditorRef = useRef<refTextEditor>(null)
  const [showPrice, setShowPrice] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deleteImages, setDeleteImages] = useState<any[] | []>([])

  return (
    <PermissonCheckLayout event={Event.UPDATE}>
      <Breadcrumb>
        <FormHandel
          isValidate
          schema={schema}
          optionValidateRest={{
            context: {
              showPrice
            }
          }}
          callApi={(data) => {
            const { id, thumb, ...spread } = data
            let result = {
              ...spread
            }

            if (deleteImages?.length > 0) {
              result = { ...result, deleteImages }
            }

            if (!isEmptyObj(thumb)) {
              result = SendFormData(result)
              config.formDataFile(thumb, result)
            }

            return UpdateProduct(id ?? 0, result)
          }}
          defaultValues={defaultValues}
          isEdit
          nameTable={tableProduct}
          id={alias}
          callApiEdit={getProduct}
          customValue={({ data, key, setValue }) => {
            if (key === valueDefaultProduct.thumb) {
              if (ImgRef.current) {
                ImgRef.current?.setSrcList?.({
                  arr: data["list_images"] ?? "",
                  isDel: true,
                  callBack: (item) => ({ id: item?.id })
                })
              }
              setIsUpdated((prev) => !prev)
              return true
            }

            if (key === valueDefaultProduct.price) {
              if (PriceRef?.current) {
                PriceRef.current?.setValue?.(data[key])
                setValue && setValue(key, data[key])
                return true
              }
            }

            if (key === valueDefaultProduct.isNegotiate) {
              setShowPrice(data[key] === 0 ? true : false)
            }

            if (key === valueDefaultProduct.description) {
              if (textEditorRef.current) {
                textEditorRef.current?.setValue(data[key])
              }
            }
          }}
          customValuesData={(value, resultApi) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { status, ...spread } = value
            const data = {
              ...spread,
              status: status ?? 1,
              id: resultApi?.data?.id
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
                  clickButtonDel={(item) => {
                    if (item?.id) {
                      setDeleteImages((prev) => [...prev, item?.id])
                    }
                  }}
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

export default EditProducts
