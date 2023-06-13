import { useMemo, useState } from "react"
import { Event, typeEventClick } from "@/types"
import { deleletProductSlide, getSliderProduct, tableSliderProduct } from "@/api/productApi"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { ViewsImagesFuc, dynamicFucEvent } from "@/config/configEvent"
import FilterProductSlide from "@/partials/Products/FilterProductSlide"
import ModelSlider from "@/components/ModalImages"
import { fucPathName } from "@/common/functions"
import PermissonCheckLayout from "@/layout/PermissonCheckLayout"
const SlideshowProducts = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [listImages, setListImages] = useState<string[]>([])

  const configFuc = useMemo(
    () => [
      {
        ...ViewsImagesFuc,
        key: "big_thumb",
        onClick: ({ data }: typeEventClick) => {
          const { big_thumb } = data
          setListImages([big_thumb])
          setIsOpen(true)
        }
      },
      ...dynamicFucEvent(config.router.editSlideshowProduct, "id", fucPathName)
    ],
    []
  )
  return (
    <PermissonCheckLayout event={Event.READ}>
      <TablePagination
        selectCheck={{
          views: true
        }}
        configDetail={config.table.configProductSildeShow}
        nameTable={tableSliderProduct}
        callApi={getSliderProduct}
        isDelete
        callApiDelete={deleletProductSlide}
        configFuc={configFuc}
        customUrl={({ nameTable, query, limit, page, searchValue }) => {
          let url = query?.for(nameTable).page(page).limit(limit)
          const obj = config.filter.other({ searchValue, key: "name" })
          url = url?.params(obj)
          return url?.url()
        }}
      >
        <ModelSlider isOpen={isOpen} setIsOpen={setIsOpen} listImages={listImages} />
        <FilterProductSlide />
      </TablePagination>
    </PermissonCheckLayout>
  )
}

export default SlideshowProducts
