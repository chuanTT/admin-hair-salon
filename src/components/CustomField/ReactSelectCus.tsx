/* eslint-disable @typescript-eslint/no-empty-function */
import Select from "react-select"
import { useDebounce } from "rooks"
import { Dispatch, FC, HTMLAttributes, SetStateAction, useState } from "react"
import { FieldValues, UseFormSetValue, UseFormGetValues, UseFormClearErrors } from "react-hook-form"
import { convertViToEn } from "@/common/functions"
import { SelectDefault } from "@/types"

export interface optionType {
  value?: number | string
  label?: string | number
}

export interface ReactSelectCusProps {
  name: string
  options?: SelectDefault[] | []
  parenSelect?: HTMLAttributes<HTMLElement>["className"]
  isMultiple?: boolean
  setValue?: UseFormSetValue<FieldValues>
  getValue?: UseFormGetValues<FieldValues>
  clearErrors?: UseFormClearErrors<FieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeSelected?: (value: any) => void
  setValueSearch?: Dispatch<SetStateAction<string>>
  timeDelay?: number
  height?: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any
  title?: string
  isRequire?: boolean
  placeholder?: string
  backgroundColor?: string
  rest?: {
    [key: string]: number | string | SelectDefault[] | SelectDefault | []
  }
}

const ReactSelectCus: FC<ReactSelectCusProps> = (prop) => {
  const {
    name,
    options,
    parenSelect,
    isMultiple,
    setValue,
    getValue,
    clearErrors,
    changeSelected,
    height,
    setValueSearch,
    timeDelay,
    errors,
    title,
    isRequire,
    placeholder,
    backgroundColor,
    rest
  } = prop
  // const [valueSearch, setValueSearch] = useState("");
  const setValueDebounced = useDebounce<Dispatch<SetStateAction<string>>>(
    setValueSearch ?? (() => {}),
    timeDelay ?? 800
  )
  const [, setRender] = useState(false)
  const value = typeof getValue === "function" ? getValue(name) : []

  const ValueSelectd = options?.filter((item: optionType) => item.value === value)

  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: backgroundColor ?? "rgb(249 250 251 / 1)",
      // Overwrittes the different states of border
      borderColor: "rgb(226 232 240 / 1)",
      textAlign: "left",

      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      height: height ?? "42px",
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "rgb(226 232 240 / 1)",

        backgroundColor: "rgb(248 250 252 / 1)"
      },
      "&:focus": {
        // Overwrittes the different states of border
        color: "#495057",
        backgroundColor: "#fff",
        borderColor: "#80bdff",
        outline: 0,
        boxShadow: "0 0 0 0.2rem rgb(0 123 255 / 25%)"
      }
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    container: (base: any) => ({
      ...base,
      width: "100%"
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IndicatorsContainer2: (base: any) => ({
      ...base,
      borderColor: "transparent"
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    indicatorSeparator: (base: any) => ({
      ...base,
      width: 0
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (provided: any) => ({ ...provided, zIndex: 9999 })
  }

  const customFilter = (option: optionType, inputValue: string) => {
    const labelConvert = convertViToEn(option?.label || "")
    const inputValueConvert = convertViToEn(inputValue).replace(/^\s+|\s+$/gm, "")

    const serching = labelConvert.includes(inputValueConvert)

    const searching = options?.filter((item) => {
      const label = convertViToEn(item?.label || "")
      const inputVl = convertViToEn(inputValue)

      return label.includes(inputVl.replace(/^\s+|\s+$/gm, ""))
    })

    if (searching && searching?.length <= 0) {
      setValueDebounced((inputValueConvert && inputValueConvert.replace(/^\s+|\s+$/gm, "")) || "")
    }
    return serching
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectedOptionChange = (selectedOption: any): void => {
    if (!Array.isArray(selectedOption)) {
      const id = selectedOption?.value
      if (errors?.message) {
        typeof clearErrors === "function" && clearErrors(name)
      }
      typeof setValue === "function" && setValue(name, id)
      typeof changeSelected === "function" && changeSelected(selectedOption)
      setRender((prev) => !prev)
    }
  }

  return (
    <div className={parenSelect}>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        id={name}
        name={name}
        menuPortalTarget={document?.body}
        value={ValueSelectd && ValueSelectd?.length > 0 ? ValueSelectd : []}
        onChange={handleSelectedOptionChange}
        filterOption={customFilter}
        styles={customStyles}
        options={options}
        isMulti={isMultiple}
        placeholder={placeholder}
        {...rest}
      />

      {errors?.[name]?.message && <span className="text-sm text-red-600 block mt-px">{errors?.[name]?.message}</span>}
    </div>
  )
}

export default ReactSelectCus
