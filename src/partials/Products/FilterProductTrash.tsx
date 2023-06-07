import { FC } from "react"
import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import { configUserIdApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"
import { FilterTrashProps } from "@/types"

const FilterProductTrash: FC<FilterTrashProps> = ({ setIsRestore }) => {
  const { searchValue, handelFilter, setSearchValue, setIsOpen, listIDs } = useTablePagination()

  return (
    <LayoutDefaultFilter
      setIsOpen={setIsOpen}
      setIsRestore={setIsRestore}
      is_show={!!(listIDs && listIDs?.length > 1)}
      is_restore
    >
      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserIdApi}
        placeholder="Chọn người tạo"
        name="user_id"
      />

      <SearchFilterForm
        placeholder="Tìm kiếm theo tên sản phẩm"
        name="name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </LayoutDefaultFilter>
  )
}

export default FilterProductTrash
