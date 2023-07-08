import { FC, Dispatch, SetStateAction, useRef } from "react"
import * as Yup from "yup"
import Portal from "@/components/Portal"
import Modal from "@/components/Modal"
import FormHandel from "@/components/FormHandel"
import { InputField } from "@/components/CustomField"
import ButtonLoading from "@/components/ButtonLoading"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import { AddSocials, UpdateSocials, getSocials, tableSocials } from "@/api/socialsApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import config from "@/config"

interface ModalDeleteCusProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  closeToastEvent?: () => void
  isEdit?: boolean
  id?: number
  msgObj?: {
    erorr?: string
    suss?: string
  }
  onSuccessModal?: () => void
  SuccessModal?: () => void
  sussFucMsg?: () => void
}

const defaultValue = {
  name: "",
  url: "",
  thumb: ""
}

const schema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
  url: Yup.string().required("Vui lòng nhập đường dẫn")
})

const ModalSocials: FC<ModalDeleteCusProps> = ({
  isOpen,
  setIsOpen,
  closeToastEvent,
  msgObj,
  sussFucMsg,
  isEdit,
  id
}) => {
  const imagesRef = useRef<refListImage>(null)

  return (
    <Portal>
      <Modal classModalWidth="max-sm:w-[90%]" isOpen={isOpen} setIsOpen={setIsOpen} isClose>
        <FormHandel
          ClassForm="form_reset_password"
          msgObj={msgObj}
          defaultValues={defaultValue}
          closeToastEvent={({ propForm }) => {
            !isEdit && propForm?.reset && propForm?.reset()
            imagesRef.current && imagesRef.current?.clearImage?.()
            closeToastEvent && closeToastEvent()
          }}
          isEdit={isEdit ?? false}
          id={id}
          callApiEdit={getSocials}
          nameTable={tableSocials}
          sussFuc={() => {
            sussFucMsg && sussFucMsg()
            setIsOpen(false)
          }}
          customValue={({ propForm, data, key }) => {
            if (propForm) {
              if (key === "thumb") {
                imagesRef.current && imagesRef.current?.setSrc?.(data?.thumb)
                return true
              }
            }
          }}
          customValuesData={(values) => {
            const { thumb, ...spread } = values
            const formData = SendFormData(spread)
            if (thumb) {
              config.formDataFile([thumb], formData, "thumb")
            }
            return formData
          }}
          removeClassForm
          isValidate
          schema={schema}
          callApi={(value) => (isEdit ? UpdateSocials(id ?? 0, value) : AddSocials(value))}
        >
          {({ isPending, propForm }) => {
            const {
              reset,
              setValue,
              register,
              formState: { errors }
            } = propForm

            return (
              <>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEdit ? "Chỉnh sửa" : "Thêm"} mạng xã hội
                      </h3>
                      <div className="mt-4">
                        <div className="row">
                          <InputField
                            classInputContainer="col-md-12 mb-3"
                            title="Tiều đề"
                            placeholder="Nhập tiều đề"
                            name="name"
                            register={register}
                            isRequire
                            errors={errors}
                          />

                          <InputField
                            classInputContainer="col-md-12 mb-3"
                            title="Đường dẫn"
                            placeholder="Nhập đường dẫn"
                            name="url"
                            register={register}
                            isRequire
                            errors={errors}
                          />

                          <ListImagesUploadFile
                            setValue={setValue}
                            ref={imagesRef}
                            title="Hình ảnh"
                            name="thumb"
                            register={register}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex max-sm:justify-center flex-row-reverse gap-2">
                  <span className="flex rounded-md shadow-sm sm:w-fit">
                    <ButtonLoading
                      onClick={(e) => {
                        e.preventDefault()
                        reset && reset()
                        imagesRef.current && imagesRef.current?.clearImage?.()
                        !isPending && setIsOpen((prev) => !prev)
                      }}
                      classCustom="bg-red-600 hover:bg-red-500 text-white max-sm:min-w-[88px]"
                    >
                      Hủy
                    </ButtonLoading>
                  </span>
                  <span className="flex rounded-md shadow-sm sm:mt-0 sm:w-fit ">
                    <ButtonLoading classCustom="btn_reset" isPrimary isPending={isPending}>
                      {isEdit ? "Chỉnh sửa" : "Thêm"}
                    </ButtonLoading>
                  </span>
                </div>
              </>
            )
          }}
        </FormHandel>
      </Modal>
    </Portal>
  )
}

export default ModalSocials
