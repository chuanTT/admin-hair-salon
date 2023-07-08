import { FC, useEffect } from "react"
import { optionShow } from "@/common/optionStatic"
import { InputField, ReactSelectCus } from "@/components/CustomField"
import { childrenFormHandel } from "@/components/FormHandel"
import Loading from "@/components/Loading"
import LayoutFormDefault from "@/layout/LayoutFormDefault"

interface UpdateCompanyProps extends childrenFormHandel {
  isFetchedSettings?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  company?: any
}

enum defaultValueCompany {
  company_name = "company_name",
  phone = "phone",
  email = "email",
  address = "address",
  link_page = "link_page",
  fanpage_id = "fanpage_id"
}

const defaultValues = {
  [defaultValueCompany.company_name]: "",
  [defaultValueCompany.phone]: "",
  [defaultValueCompany.email]: "",
  [defaultValueCompany.address]: "",
  [defaultValueCompany.link_page]: "",
  [defaultValueCompany.fanpage_id]: ""
}

const UpdateCompany: FC<UpdateCompanyProps> = ({ isFetchedSettings, propForm, isPending, company }) => {
  const { getValues, setValue, register } = propForm

  useEffect(() => {
    if (company) {
      const keys = Object.keys(defaultValues)
      if (keys && Array.isArray(keys)) {
        keys.forEach((key) => {
          if (key === defaultValueCompany.address) {
            setValue(key, company[key]?.text)
            setValue("link_address", company[key]?.link)
          } else if (key === defaultValueCompany.link_page) {
            setValue(key, company[key]?.url)
            setValue("is_show_page", company[key]?.is_show_page)
          } else {
            setValue && setValue(key, company[key])
          }
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company])

  return (
    <div>
      <h2 className="text-lg">Thông tin công ty / cá nhân</h2>

      {!isFetchedSettings && <Loading classNameDiv="flex justify-center [&>*]:scale-50 items-start py-4" />}
      {isFetchedSettings && (
        <LayoutFormDefault txtButtonPrimary="Cập nhật" isPending={isPending}>
          <InputField
            classInputContainer="mb-3 col-md-6"
            name="company_name"
            placeholder="Nhập tên công ty / cá nhân"
            title="Tên công ty/cá nhân"
            register={register}
          />

          <InputField
            classInputContainer="mb-3 col-md-6"
            name="phone"
            placeholder="Nhập số điện thoại"
            title="Số điện thoại"
            register={register}
          />

          <InputField
            classInputContainer="mb-3 col-md-6"
            name="email"
            placeholder="Nhập email"
            title="Email"
            register={register}
          />
          <InputField
            classInputContainer="mb-3 col-md-6"
            name="fanpage_id"
            placeholder="Nhập id trang(Facebook)"
            title="Id trang(Facebook)"
            register={register}
          />

          <InputField
            classInputContainer="mb-3 col-md-6"
            name="address"
            placeholder="Nhập địa chỉ"
            title="Địa chỉ"
            register={register}
          />

          <InputField
            classInputContainer="mb-3 col-md-6"
            name="link_address"
            placeholder="Nhập đường dẫn địa chỉ"
            title="Đường dẫn địa chỉ"
            register={register}
          />

          <InputField
            classInputContainer="mb-3 col-md-6"
            name="link_page"
            placeholder="Nhập đường dẫn trang (Facebook)"
            title="Nhập đường dẫn trang"
            register={register}
          />

          <ReactSelectCus
            title="Hiển thị đường dẫn trang"
            parenSelect="mb-3 col-md-6"
            placeholder="Chọn"
            name="is_show_page"
            options={optionShow}
            getValue={getValues}
            setValue={setValue}
          />
        </LayoutFormDefault>
      )}
    </div>
  )
}

export default UpdateCompany
