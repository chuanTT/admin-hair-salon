import { Dispatch, FC, MutableRefObject, SetStateAction } from "react"
import SearchFilterForm from "@/components/SearchFilterForm"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"
import ModalAddCategory from "./ModalAddCategory"

interface FilterCategoryProps {
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  idCate: MutableRefObject<{
    id: number
    isEdit: boolean
  }>
}

const FilterCategory: FC<FilterCategoryProps> = ({ isOpenModal, setIsOpenModal, idCate }) => {
  const { searchValue, setSearchValue, setIsOpen, listIDs } = useTablePagination()
  return (
    <LayoutDefaultFilter
      isButton
      isEvent
      txtButton="Thêm danh mục"
      setIsOpen={setIsOpen}
      is_show={!!(listIDs && listIDs?.length > 1)}
      onClick={() => {
        idCate.current = { isEdit: false, id: 0 }
        setIsOpenModal(true)
      }}
    >
      <SearchFilterForm
        placeholder="Tìm kiếm theo tên danh mục"
        name="name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <ModalAddCategory
        id={idCate.current.id}
        isEdit={idCate.current.isEdit}
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />
    </LayoutDefaultFilter>
  )
}

export default FilterCategory
