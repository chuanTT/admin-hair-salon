import { FC, Dispatch, SetStateAction } from "react"
import * as Yup from "yup"
import Portal from "@/components/Portal"
import Modal from "@/components/Modal"
import FormHandel from "@/components/FormHandel"
import { InputField } from "@/components/CustomField"
import ButtonLoading from "@/components/ButtonLoading"
import { addCategory, getCategory, tableCategory, updateCategory } from "@/api/productApi"

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
  name: ""
}

const schema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên danh mục")
})

const ModalAddCategory: FC<ModalDeleteCusProps> = ({
  isOpen,
  setIsOpen,
  closeToastEvent,
  msgObj,
  sussFucMsg,
  isEdit,
  id
}) => {
  return (
    <Portal>
      <Modal classModalWidth="max-sm:w-[90%]" isOpen={isOpen} setIsOpen={setIsOpen} isClose>
        <FormHandel
          ClassForm="form_reset_password"
          msgObj={msgObj}
          defaultValues={defaultValue}
          closeToastEvent={({ propForm }) => {
            propForm?.reset && propForm?.reset()
            closeToastEvent && closeToastEvent()
            setIsOpen(false)
          }}
          isEdit={isEdit ?? false}
          id={id}
          callApiEdit={getCategory}
          nameTable={tableCategory}
          sussFuc={sussFucMsg}
          removeClassForm
          isValidate
          schema={schema}
          callApi={(value) => (isEdit ? updateCategory(id ?? 0, value) : addCategory(value))}
        >
          {({ isPending, propForm }) => {
            const {
              reset,
              register,
              formState: { errors }
            } = propForm

            return (
              <>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEdit ? "Chỉnh sửa" : "Thêm"} danh mục
                      </h3>
                      <div className="mt-4">
                        <div className="row">
                          <InputField
                            classInputContainer="col-md-12 mb-3"
                            title="Tên danh mục"
                            placeholder="Nhập tên danh mục"
                            name="name"
                            register={register}
                            isRequire
                            errors={errors}
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
                        !isEdit && reset && reset()
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

export default ModalAddCategory
