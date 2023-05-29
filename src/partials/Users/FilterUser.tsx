import { getUser, tableUser } from "@/api/usersApi"
import { configAll, funcUserKey } from "@/common/ConfigSelectOption"
import Button from "@/components/Button"
import { InputField, ReactSelectCus } from "@/components/CustomField"
import useFethingOptionApi from "@/hooks/useFetchingOptionApi"
import { useTablePagination } from "@/layout/TablePagination"
import { FaSearch } from "react-icons/fa"

const FilterUser = () => {
  const { searchValue, handelFilter, setSearchValue } = useTablePagination()
  const valueInput = typeof searchValue?.["full_name"] === "boolean" ? "" : searchValue?.["full_name"]
  const valuesNew = valueInput || ""
  const { option } = useFethingOptionApi({
    nameTable: tableUser,
    CallAPi: getUser,
    isSearching: true,
    isOptionAll: true,
    customFucKey: funcUserKey,
    customOptionAll: ({ data }) => {
      return [configAll(), ...data]
    }
  })

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 [&>*]:w-72 flex-wrap max-sm:[&>*]:w-full [&>*]:h-10">
        <ReactSelectCus
          parenSelect="bg-white"
          placeholder="Chọn nhân viên"
          name="user"
          options={option}
          rest={{
            value: option?.filter((item) => item?.value === searchValue?.["user"]) || []
          }}
          changeSelected={(data) => {
            typeof handelFilter === "function" &&
              handelFilter({
                user: data?.value
              })
          }}
        />
        <div className="flex items-center space-x-2">
          <InputField
            classInputContainer="flex-1"
            placeholder="Tìm kiếm theo họ tên"
            name="full_name"
            value={valuesNew}
            onChange={(e) => {
              const elemet = e.target as HTMLInputElement
              if (elemet && setSearchValue) {
                setSearchValue((prev) => ({ ...prev, full_name: elemet?.value?.toString()?.trim(), submit: false }))
              }
            }}
          />

          <Button customClass="text-lg font-medium p-2 border !rounded bg-blue-icon bg-indigo-600 hover:bg-indigo-500 text-white" onClick={(e) => {
            const vl = searchValue?.["full_name"]?.toString()?.trim()
            if (vl && setSearchValue) {
              setSearchValue((prev) => ({ ...prev, full_name: vl, submit: true }))
            }
          }}>
            <FaSearch />
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default FilterUser
