import SearchFilterForm from "@/components/SearchFilterForm"
import SelectFilterForm from "@/components/SelectFilterForm"
import config from "@/config"
import { configUserIdApi } from "@/config/configCallApi"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"

const FilterProduct = () => {
  const { searchValue, handelFilter, setSearchValue, setIsOpen, listIDs } = useTablePagination()

  return (
    <LayoutDefaultFilter
      isButton
      to={config.router.addProduct}
      txtButton="Thêm sản phẩm"
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
        placeholder="Tìm kiếm theo tên sản phẩm"
        name="name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </LayoutDefaultFilter>
  )
}

export default FilterProduct
