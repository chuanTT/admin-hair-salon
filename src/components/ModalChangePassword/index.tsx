import { FC, Dispatch, SetStateAction } from "react"
import { AxiosResponse } from "axios"
import * as Yup from "yup"
import Modal from "../Modal"

import FormHandel from "../FormHandel"
import Portal from "../Portal"
import { InputField } from "../CustomField"
import ButtonLoading from "../ButtonLoading"

interface ModalDeleteCusProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  closeToastEvent?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApiDelete: (data: any) => Promise<AxiosResponse<any, any>>
  msgObj?: {
    erorr?: string
    suss?: string
  }
  onSuccessModal?: () => void
  SuccessModal?: () => void
  sussFucMsg?: () => void
}

const schema = Yup.object().shape({
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 ký tự"),
  password_old: Yup.string().required("Vui lòng nhập mật khẩu hiện tại").min(6, "Mật khẩu tối thiểu 6 ký tự"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
})

const ModalChangePassword: FC<ModalDeleteCusProps> = ({
  isOpen,
  setIsOpen,
  closeToastEvent,
  callApiDelete,
  msgObj,
  sussFucMsg
}) => {
  return (
    <Portal>
      <Modal classModalWidth="max-sm:w-[90%]" isOpen={isOpen} setIsOpen={setIsOpen} isClose>
        <FormHandel
          ClassForm="form_reset_password"
          msgObj={msgObj}
          closeToastEvent={({ propForm }) => {
            propForm?.reset &&
              propForm?.reset({
                password: "",
                password_old: "",
                confirm_password: ""
              })

            closeToastEvent && closeToastEvent()
            setIsOpen(false)
          }}
          sussFuc={sussFucMsg}
          removeClassForm
          isValidate
          schema={schema}
          callApi={(value: { password: string | number; confirm_password: string | number }) => callApiDelete(value)}
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
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Thay đổi mật khẩu</h3>
                      <div className="mt-4">
                        <div className="row">
                          <InputField
                            type="password"
                            classInputContainer="col-md-12 mb-3"
                            title="Mật khẩu"
                            placeholder="Nhập mật khẩu hiện tại"
                            name="password_old"
                            register={register}
                            isRequire
                            errors={errors}
                          />

                          <InputField
                            type="password"
                            classInputContainer="col-md-12 mb-3"
                            title="Mật khẩu mới"
                            placeholder="Nhập mật khẩu mới"
                            name="password"
                            register={register}
                            isRequire
                            errors={errors}
                          />

                          <InputField
                            type="password"
                            classInputContainer="col-md-12 mb-3"
                            title="Xác nhận mật khẩu mới"
                            placeholder="Nhập xác nhận mật khẩu mới"
                            name="confirm_password"
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
                        reset &&
                          reset({
                            password: "",
                            password_old: "",
                            confirm_password: ""
                          })
                        !isPending && setIsOpen((prev) => !prev)
                      }}
                      classCustom="bg-red-600 hover:bg-red-500 text-white max-sm:min-w-[88px]"
                    >
                      Hủy
                    </ButtonLoading>
                  </span>
                  <span className="flex rounded-md shadow-sm sm:mt-0 sm:w-fit ">
                    <ButtonLoading classCustom="btn_reset" isPrimary isPending={isPending}>
                      Cập nhật
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

export default ModalChangePassword
