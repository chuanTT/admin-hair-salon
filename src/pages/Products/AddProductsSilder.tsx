import { useRef } from "react"
import * as Yup from "yup"

import Breadcrumb from "@/components/Breadcrumb"
import { ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { addProductSlideApi } from "@/api/productApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { optionShow } from "@/common/optionStatic"
import useFethingOptionApi from "@/hooks/useFetchingOptionApi"
import { configProductApi } from "@/config/configCallApi"
import PermissonCheckLayout from "@/layout/PermissonCheckLayout"
import { Event } from "@/types"

const schema = Yup.object().shape({
  id_product: Yup.string().required("Vui lòng chọn sản phẩm")
})

const defaultValue = {
  is_show: 0
}

const AddProducts = () => {
  const ImgRef = useRef<refListImage>(null)
  const { option: optionProduct } = useFethingOptionApi({
    ...configProductApi
  })

  return (
    <PermissonCheckLayout event={Event.CREATE}>
      <Breadcrumb>
        <FormHandel
          isValidate
          schema={schema}
          defaultValues={defaultValue}
          callApi={addProductSlideApi}
          closeFuncSucc={({ remove, propForm }) => {
            typeof remove === "function" && remove()
            propForm && propForm.reset()
            ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
          }}
          customValuesData={(value) => {
            const is_show = value?.is_show === 0 ? "0" : value?.is_show

            const data = {
              ...value,
              is_show
            }

            return SendFormData(data)
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
                <ReactSelectCus
                  title="Sản phẩm"
                  parenSelect="mb-3 col-md-6"
                  placeholder="Chọn sản phẩm"
                  name="id_product"
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
    </PermissonCheckLayout>
  )
}

export default AddProducts
