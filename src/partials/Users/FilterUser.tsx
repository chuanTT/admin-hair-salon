import { ReactSelectCus } from "@/components/CustomField"
import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import config from "@/config"
import { configUserAllApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterUser = () => {
  const { searchValue, handelFilter, setSearchValue } = useTablePagination()

  return (
    <LayoutDefaultFilter isButton to={config.router.addUser} txtButton="Thêm nhân viên">
      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserAllApi}
        placeholder="Chọn nhân viên"
        name="user"
      />

      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserAllApi}
        placeholder="Chọn vị trí"
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
