import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import config from "@/config"
import { configUserAllApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterUser = () => {
  const { searchValue, handelFilter, setSearchValue, setIsOpen, listIDs } = useTablePagination()

  return (
    <LayoutDefaultFilter isButton to={config.router.addUser} txtButton="Thêm nhân viên" setIsOpen={setIsOpen} is_show={!!(listIDs && listIDs?.length > 1)}>
      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserAllApi}
        placeholder="Chọn nhân viên"
        name="user"
      />

      <SearchFilterForm
        placeholder="Tìm kiếm theo họ tên"
        name="full_name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </LayoutDefaultFilter>
  )
}

export default FilterUser
