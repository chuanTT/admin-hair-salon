import { getUser, tableUser } from "@/api/usersApi"
import { configAll, funcUserKey } from "@/common/ConfigSelectOption"
import { ReactSelectCus } from "@/components/CustomField"
import SearchFilterForm from "@/components/SearchFilterForm"
import config from "@/config"
import useFethingOptionApi from "@/hooks/useFetchingOptionApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterUser = () => {
  const { searchValue, handelFilter, setSearchValue } = useTablePagination()
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
    <LayoutDefaultFilter isButton to={config.router.addUser} txtButton="Thêm nhân viên">
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

      <SearchFilterForm placeholder="Tìm kiếm theo họ tên" name="full_name" searchValue={searchValue} setSearchValue={setSearchValue} />
    </LayoutDefaultFilter>
  )
}

export default FilterUser
