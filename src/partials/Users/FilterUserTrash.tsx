import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import { configUserAllApi, configUserAllTrashApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterUserTrash = () => {
  const { searchValue, handelFilter, setSearchValue, listIDs, setIsOpen } = useTablePagination()

  return (
    <LayoutDefaultFilter setIsOpen={setIsOpen} is_show={!!(listIDs && listIDs?.length > 1)}>
      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserAllTrashApi}
        placeholder="Chọn nhân viên"
        name="user"
      />

      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserAllApi}
        placeholder="Chọn vị trí"
        name="role"
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

export default FilterUserTrash
