import { FC } from "react"
import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import { configUserAllTrashApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"
import { FilterTrashProps } from "@/types"

const FilterUserTrash: FC<FilterTrashProps> = ({ setIsRestore }) => {
  const { searchValue, handelFilter, setSearchValue, listIDs, setIsOpen } = useTablePagination()

  return (
    <LayoutDefaultFilter setIsOpen={setIsOpen} setIsRestore={setIsRestore} is_restore is_show={!!(listIDs && listIDs?.length > 1)}>
      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserAllTrashApi}
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

export default FilterUserTrash
