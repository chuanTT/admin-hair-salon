import { useMemo, useState } from "react"
import { typeEventClick } from "@/types"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { DeteleFuc, EditFuc, ViewsImagesFuc } from "@/config/configEvent"
import ModelSlider from "@/components/ModalImages"
import {  sliceRouteDynamic } from "@/common/functions"
import { deleteSection, getSection, tableSection } from "@/api/sectionApi"
import FilterSection from "@/partials/Settings/FilterSection"
const SectionList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [listImages, setListImages] = useState<string[]>([])

  const configFuc = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { typeEvent, ...restDelete } = DeteleFuc
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { typeEvent: TyEventEdit, ...restEdit } = EditFuc
    return [
      {
        ...ViewsImagesFuc,
        key: "thumb",
        onClick: ({ data }: typeEventClick) => {
          const { thumb } = data
          setListImages([thumb])
          setIsOpen(true)
        }
      },
      restDelete,
      {
        ...restEdit,
        to: sliceRouteDynamic(config.router.editSection)
      }
    ]
  }, [])
  return (
    <TablePagination
      configDetail={config.table.configSection}
      nameTable={tableSection}
      callApi={getSection}
      isDelete
      is_checkEvent
      callApiDelete={deleteSection}
      configFuc={configFuc}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, key: "name" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <ModelSlider isOpen={isOpen} setIsOpen={setIsOpen} listImages={listImages} />
      <FilterSection />
    </TablePagination>
  )
}

export default SectionList
