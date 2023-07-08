import { Dispatch, FC, MutableRefObject, SetStateAction } from "react"
import LayoutDefaultFilter from "@/layout/LayoutDefaultFilter"
import { useTablePagination } from "@/layout/TablePagination"
import ModalSocials from "./ModalSocials"

interface FilterSocialsProps {
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  idCate: MutableRefObject<{
    id: number
    isEdit: boolean
  }>
}

const FilterSocials: FC<FilterSocialsProps> = ({ isOpenModal, setIsOpenModal, idCate }) => {
  const { setIsOpen, data } = useTablePagination()
  const isShow = !!(data?.data?.data?.length === 10)

  return (
    <LayoutDefaultFilter
      isButton={!isShow}
      isEvent
      txtButton="Thêm mạng xã hội"
      setIsOpen={setIsOpen}
      onClick={() => {
        idCate.current = { isEdit: false, id: 0 }
        setIsOpenModal(true)
      }}
    >
      {!isShow && (
        <ModalSocials
          id={idCate.current.id}
          isEdit={idCate.current.isEdit}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
        />
      )}
    </LayoutDefaultFilter>
  )
}

export default FilterSocials
