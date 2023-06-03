import { FC } from "react"
import { ReactSelectCus } from "../CustomField"
import { typeObject } from "@/types"
import useFethingOptionApi, { useFetchingOptionApiProps } from "@/hooks/useFetchingOptionApi"
import { ReactSelectCusProps } from "../CustomField/ReactSelectCus"

interface SelectFilterFormProps extends ReactSelectCusProps {
  handelFilter?: (value: typeObject) => void
  searchValue?: typeObject
  configApi: useFetchingOptionApiProps
}

const SelectFilterForm: FC<SelectFilterFormProps> = ({ handelFilter, searchValue, placeholder, name, configApi }) => {
  const { option } = useFethingOptionApi({
    ...configApi
  })

  return (
    <ReactSelectCus
      parenSelect="bg-white"
      placeholder={placeholder ?? "Vui lòng chọn"}
      name={name}
      options={option}
      rest={{
        value: option?.filter((item) => item?.value === searchValue?.[name]) || []
      }}
      changeSelected={(data) => {
        handelFilter &&
          handelFilter({
            [name]: data?.value
          })
      }}
      backgroundColor="#FFFFFF"
    />
  )
}

export default SelectFilterForm
