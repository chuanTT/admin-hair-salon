import { useRef } from "react"
import * as Yup from "yup"

import Breadcrumb from "@/components/Breadcrumb"
import { ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { addProductApi, addProductSlideApi } from "@/api/productApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { optionShow } from "@/common/optionStatic"
import config from "@/config"
import useFethingOptionApi from "@/hooks/useFetchingOptionApi"
import { configProductApi } from "@/config/configCallApi"



const schema = Yup.object().shape({
  id_product: Yup.string().required('Vui lòng chọn sản phẩm')
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
          const { big_thumb, ...spread } = value
          const is_show = spread?.is_show === 0 ? '0' : spread?.is_show

          const data = {
            ...spread,
            is_show
          }
          const formData = SendFormData(data)
          config.formDataFile(big_thumb, formData, "big_thumb")

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
                name="status"
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

export default AddProducts
