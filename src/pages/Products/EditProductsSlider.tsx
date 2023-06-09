import { useRef, useState } from "react"
import Breadcrumb from "@/components/Breadcrumb"
import { ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { useParams } from "react-router-dom"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { UpdateProductSlider, getSliderProduct, tableSliderProduct } from "@/api/productApi"
import { optionShow } from "@/common/optionStatic"
import { SelectDefault } from "@/types"
import { removeProperty } from "@/common/functions"

export enum valueDefaultProduct {
  is_show = 'is_show',
  big_thumb = 'big_thumb',
  product = "product"
}

const defaultValues = {
  [valueDefaultProduct.is_show]: "",
  [valueDefaultProduct.big_thumb]: "",
  [valueDefaultProduct.product]: "",
}

const EditProductsSlider = () => {
  const { id } = useParams()
  const [optionProduct, setOptionProduct] = useState<SelectDefault[]>([])
  const [, setIsUpdated] = useState(false)
  const ImgRef = useRef<refListImage>(null)

  return (
    <Breadcrumb>
      <FormHandel
        callApi={(value) => {
          const is_show = value?.is_show === 0 ? '0' : value?.is_show
          let data = {
            ...value,
            is_show
          }
          data = removeProperty('product', data)
          return UpdateProductSlider(id ?? 0, SendFormData(data))
        }}
        defaultValues={defaultValues}
        isEdit
        nameTable={tableSliderProduct}
        id={id}
        callApiEdit={getSliderProduct}
        customValue={({ data, key, setValue }) => {
          if (key === valueDefaultProduct.big_thumb) {
            if (ImgRef.current) {
              ImgRef.current?.setSrc?.(data[key])
            }
            setIsUpdated((prev) => !prev)
            return true
          }

          if (key === valueDefaultProduct.product) {
            const { id, name } = data[key]
            setOptionProduct([{
              value: id,
              label: name
            }])
            setValue && setValue(key, id)
            return true
          }
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
              <ReactSelectCus
                title="Sản phẩm"
                parenSelect="mb-3 col-md-6"
                placeholder="Chọn sản phẩm"
                name="product"
                options={optionProduct}
                getValue={getValues}
                setValue={setValue}
                isRequire
                errors={errors}
              />

              <ReactSelectCus
                title="Hiển thị"
                parenSelect="mb-3 col-md-6"
                placeholder="Chọn trạng thái"
                name="is_show"
                options={optionShow}
                getValue={getValues}
                setValue={setValue}

              />

              <ListImagesUploadFile
                classParentImg="mb-3"
                ref={ImgRef}
                setValue={setValue}
                title="Hình ảnh đại diện"
                name="big_thumb"
                register={register}
              />
            </LayoutFormDefault>
          )
        }}
      </FormHandel>
    </Breadcrumb>
  )
}

export default EditProductsSlider
