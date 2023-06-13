import { deleletProduct, getProduct, tableProduct } from "@/api/productApi"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { ViewsImagesFuc, dynamicFucEvent } from "@/config/configEvent"
import FilterProduct from "@/partials/Products/FilterProduct"
import { useMemo, useState } from "react"
import { Event, typeEventClick } from "@/types"
import ModelSlider from "@/components/ModalImages"
import PermissonCheckLayout from "@/layout/PermissonCheckLayout"
const Product = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [listImages, setListImages] = useState<string[]>([])

  const configFuc = useMemo(
    () => [
      {
        ...ViewsImagesFuc,
        key: "list_images",
        onClick: ({ data }: typeEventClick) => {
          const { list_images } = data
          if (list_images && Array.isArray(list_images)) {
            let list = list_images

            if (list.length > 0) {
              list = list.map((item) => item?.thumb)
              setListImages(list)
            }
          }
          setIsOpen(true)
        }
      },
      ...dynamicFucEvent(config.router.editProduct)
    ],
    []
  )

  return (
    <PermissonCheckLayout event={Event.READ}>
      <TablePagination
        selectCheck={{
          views: true
        }}
        configDetail={config.table.configProduct}
        nameTable={tableProduct}
        callApi={getProduct}
        isDelete
        callApiDelete={deleletProduct}
        configFuc={configFuc}
        customUrl={({ nameTable, query, limit, page, searchValue }) => {
          let url = query?.for(nameTable).page(page).limit(limit)
          const obj = config.filter.other({ searchValue, key: "name" })
          url = url?.params(obj)
          return url?.url()
        }}
      >
        <ModelSlider isOpen={isOpen} setIsOpen={setIsOpen} listImages={listImages} />
        <FilterProduct />
      </TablePagination>
    </PermissonCheckLayout>
  )
}

export default Product
