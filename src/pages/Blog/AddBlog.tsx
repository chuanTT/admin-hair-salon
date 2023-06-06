import { useRef } from "react"
import * as Yup from "yup"

import Breadcrumb from "@/components/Breadcrumb"
import { InputField, TextArea } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import TextEditorCustom, { refTextEditor } from "@/components/CustomField/TextEditor"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import config from "@/config"
import { addBlogApi } from "@/api/blogsApi"

const schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tiều đề bài viết"),
  short_content: Yup.string().required("Vui lòng nhập nội dung ngắn"),
  description: Yup.string().required("Vui lòng nhập mô tả")
})

const AddBlog = () => {
  const ImgRef = useRef<refListImage>(null)
  const textEditorRef = useRef<refTextEditor>(null)

  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={addBlogApi}
        closeFuncSucc={({ remove, propForm }) => {
          typeof remove === "function" && remove()
          propForm && propForm.reset()
          ImgRef?.current && ImgRef?.current?.clearImage && ImgRef?.current?.clearImage()
          textEditorRef?.current && textEditorRef?.current?.clearValue()
        }}
        customValuesData={(value) => {
          const { thumb_blog, ...spread } = value
          const data = {
            ...spread
          }
          console.log(thumb_blog)
          const formData = SendFormData(data)
          config.formDataFile([thumb_blog], formData, "thumb-blog")

          return formData
        }}
      >
        {({ propForm, isPending }) => {
          const {
            register,
            reset,
            setValue,
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
                classInputContainer="col-md-12 mb-3"
                title="Tiều đề bài viết"
                placeholder="Nhập tiều đề bài viết"
                name="title"
                register={register}
                isRequire
                errors={errors}
              />

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
                title="Hình ảnh"
                name="thumb_blog"
                register={register}
              />

              <TextEditorCustom
                classAreaContainer="col-md-12 mb-3"
                title="Mô tả bài viết"
                placeholder="Nhập mô tả bài viết"
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
  )
}

export default AddBlog
