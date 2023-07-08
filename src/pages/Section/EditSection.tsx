import { useRef, useState } from "react"
import * as Yup from "yup"
import Breadcrumb from "@/components/Breadcrumb"
import { InputField, ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import FormHandel from "@/components/FormHandel"
import { useParams } from "react-router-dom"
import { isEmptyObj } from "@/common/functions"
import SendFormData from "@/components/FormHandel/SendFormData"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import TextEditorCustom, { refTextEditor } from "@/components/CustomField/TextEditor"
import config from "@/config"
import { optionShow } from "@/common/optionStatic"
import { UpdateSection, getSection, tableSection } from "@/api/sectionApi"

const schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tiều đề thành phần"),
  sub_title: Yup.string().required("Vui lòng nhập tiêu đề phụ"),
  content: Yup.string().required("Vui lòng nhập mô tả")
})

export enum valueDefaultProduct {
  title = "title",
  sub_title = "sub_title",
  thumb = "thumb",
  content = "content",
  show_index = "show_index",
  is_show = "is_show"
}

const defaultValues = {
  [valueDefaultProduct.title]: "",
  [valueDefaultProduct.sub_title]: "",
  [valueDefaultProduct.thumb]: "",
  [valueDefaultProduct.content]: "",
  [valueDefaultProduct.show_index]: "",
  [valueDefaultProduct.is_show]: ""
}

const EditSection = () => {
  const { id } = useParams()
  const [, setIsUpdated] = useState(false)
  const ImgRef = useRef<refListImage>(null)
  const textEditorRef = useRef<refTextEditor>(null)

  return (
    <Breadcrumb>
      <FormHandel
        isValidate
        schema={schema}
        callApi={(data) => {
          const { id, thumb, is_show, show_index, ...spread } = data
          let result = {
            ...spread,
            is_show: is_show ? "1" : "0",
            show_index: show_index ? "1" : "0"
          }

          if (!isEmptyObj(thumb)) {
            result = SendFormData(result)
            config.formDataFile([thumb], result, "thumb")
          }

          return UpdateSection(id ?? 0, result)
        }}
        defaultValues={defaultValues}
        isEdit
        nameTable={tableSection}
        id={id}
        callApiEdit={getSection}
        customValue={({ data, key }) => {
          if (key === valueDefaultProduct.thumb) {
            if (ImgRef.current) {
              ImgRef.current?.setSrc?.(data?.["thumb"])
              setIsUpdated((prev) => !prev)
              return true
            }
          }

          if (key === valueDefaultProduct.content) {
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

export default EditSection
