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
  id: string | number
  setIsOpen: Dispatch<SetStateAction<boolean>>
  closeToastEvent?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApiDelete: (id: number | string, data: any) => Promise<AxiosResponse<any, any>>
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
  confirm_password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
})

const ModalResetPassword: FC<ModalDeleteCusProps> = ({
  isOpen,
  id,
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
                confirm_password: ""
              })

            closeToastEvent && closeToastEvent()
            setIsOpen(false)
          }}
          sussFuc={sussFucMsg}
          removeClassForm
          isValidate
          schema={schema}
          callApi={(value: { password: string | number; confirm_password: string | number }) =>
            callApiDelete(id, value)
          }
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
                    <div className="text-center sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Reset mật khẩu</h3>
                      <div className="mt-4">
                        <div className="row">
                          <InputField
                            type="password"
                            classInputContainer="col-md-12 mb-3"
                            title="Mật khẩu"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            register={register}
                            isRequire
                            errors={errors}
                          />

                          <InputField
                            type="password"
                            classInputContainer="col-md-12 mb-3"
                            title="Xác nhận mật khẩu"
                            placeholder="Nhập xác nhận mật khẩu"
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
                      Đồng ý
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

export default ModalResetPassword
