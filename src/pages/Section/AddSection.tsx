import { useRef } from "react"
import * as Yup from "yup"

import Breadcrumb from "@/components/Breadcrumb"
import { InputField, ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import TextEditorCustom, { refTextEditor } from "@/components/CustomField/TextEditor"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import config from "@/config"
import { optionShow } from "@/common/optionStatic"
import { AddSectionApi } from "@/api/sectionApi"

const schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tiều đề thành phần"),
  sub_title: Yup.string().required("Vui lòng nhập tiêu đề phụ"),
  content: Yup.string().required("Vui lòng nhập mô tả")
})

const AddSection = () => {
  const ImgRef = useRef<refListImage>(null)
  const textEditorRef = useRef<refTextEditor>(null)

  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={AddSectionApi}
        closeFuncSucc={({ remove, propForm }) => {
          typeof remove === "function" && remove()
          propForm && propForm.reset()
          ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
          textEditorRef?.current && textEditorRef?.current?.clearValue()
        }}
        customValuesData={(value) => {
          const { thumb, ...spread } = value
          const data = {
            ...spread,
            is_show: spread?.is_show ? spread?.is_show : "0",
            show_index: spread?.show_index ? spread?.show_index : "0"
          }
          const formData = SendFormData(data)
          if (thumb) {
            config.formDataFile([thumb], formData, "thumb")
          }

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
                title="Tiều đề thành phần"
                placeholder="Nhập tiều đề thành phần"
                name="title"
                register={register}
                isRequire
                errors={errors}
              />

              <InputField
                classInputContainer="col-md-6 mb-3"
                title="Tiều đề phụ"
                placeholder="Nhập tiều đề hụ"
                name="sub_title"
                register={register}
                isRequire
                errors={errors}
              />

              <ReactSelectCus
                title="Trạng thái"
                parenSelect="mb-3 col-md-6"
                placeholder="Chọn trạng thái"
                name="is_show"
                options={optionShow}
                getValue={getValues}
                setValue={setValue}
              />

              <ReactSelectCus
                title="Hiện thị trang chủ"
                parenSelect="mb-3 col-md-6"
                placeholder="Chọn"
                name="show_index"
                options={optionShow}
                getValue={getValues}
                setValue={setValue}
              />

              <ListImagesUploadFile
                classParentImg="mb-3"
                ref={ImgRef}
                setValue={setValue}
                title="Hình ảnh"
                name="thumb"
                register={register}
              />

              <TextEditorCustom
                classAreaContainer="col-md-12 mb-3"
                title="Mô tả thành phần"
                placeholder="Nhập mô tả thành phần"
                name="content"
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
  )
}

export default AddSection
