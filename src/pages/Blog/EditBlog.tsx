import { useRef, useState } from "react"
import * as Yup from "yup"
import Breadcrumb from "@/components/Breadcrumb"
import { InputField, TextArea } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { useParams } from "react-router-dom"
import { isEmptyObj } from "@/common/functions"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import TextEditorCustom, { refTextEditor } from "@/components/CustomField/TextEditor"
import config from "@/config"
import { UpdateBlog, getBlog, tableBlog } from "@/api/blogsApi"

const schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập họ và tên"),
  short_content: Yup.string().required("Vui lòng nhập nội dung ngắn"),
  description: Yup.string().required("Vui lòng nhập mô tả"),
})
export enum valueDefaultProduct {
  title = "title",
  thumb_blog = "thumb_blog",
  short_content = "short_content",
  description = "description"
}

const defaultValues = {
  [valueDefaultProduct.title]: "",
  [valueDefaultProduct.thumb_blog]: "",
  [valueDefaultProduct.short_content]: "",
  [valueDefaultProduct.description]: ""
}

const EditBlog = () => {
  const { alias } = useParams()
  const [, setIsUpdated] = useState(false)
  const ImgRef = useRef<refListImage>(null)
  const textEditorRef = useRef<refTextEditor>(null)

  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={(data) => {
          const { id, thumb_blog, ...spread } = data
          let result = {
            ...spread
          }

          if (!isEmptyObj(thumb_blog)) {
            result = SendFormData(result)
            config.formDataFile([thumb_blog], result, "thumb-blog")
          }

          return UpdateBlog(id ?? 0, result)
        }}
        defaultValues={defaultValues}
        isEdit
        nameTable={tableBlog}
        id={alias}
        callApiEdit={getBlog}
        customValue={({ data, key }) => {
          if (key === valueDefaultProduct.thumb_blog) {
            if (ImgRef.current) {
              ImgRef.current?.setSrc?.(data?.["thumb"])
              setIsUpdated((prev) => !prev)
              return true
            }
          }

          if (key === valueDefaultProduct.description) {
            if (textEditorRef.current) {
              textEditorRef.current?.setValue(data[key])
            }
          }
        }}
        customValuesData={(value, resultApi) => {
          const data = {
            ...value,
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

export default EditBlog
