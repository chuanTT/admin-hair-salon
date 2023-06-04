import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import { configUserIdApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterBlogTrash = () => {
  const { searchValue, handelFilter, setSearchValue, setIsOpen, listIDs } = useTablePagination()

  return (
    <LayoutDefaultFilter
      setIsOpen={setIsOpen}
      is_show={!!(listIDs && listIDs?.length > 1)}
    >
      <SelectFilterForm
        searchValue={searchValue}
        handelFilter={handelFilter}
        configApi={configUserIdApi}
        placeholder="Chọn người tạo"
        name="user_id"
      />

      <SearchFilterForm
        placeholder="Tìm kiếm theo tên bài viết"
        name="title"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </LayoutDefaultFilter>
  )
}

export default FilterBlogTrash
