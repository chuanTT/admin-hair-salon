import { useMemo, useState } from "react"
import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { ViewsImagesFuc, dynamicFucEvent } from "@/config/configEvent"
import { deleleteBlog, getBlog, tableBlog } from "@/api/blogsApi"
import FilterBlog from "@/partials/Blog/FilterBlog"
import ModelSlider from "@/components/ModalImages"
import { typeEventClick } from "@/types"

const Blog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [listImages, setListImages] = useState<string[]>([])

  const configFuc = useMemo(
    () => [
      {
        ...ViewsImagesFuc,
        onClick: ({ id }: typeEventClick) => {
          setListImages([id as string])
          setIsOpen(true)
        }
      },
      ...dynamicFucEvent(config.router.editBlog)
    ],
    []
  )

  return (
    <TablePagination
      selectCheck={{
        views: true
      }}
      configDetail={config.table.configBlog}
      nameTable={tableBlog}
      callApi={getBlog}
      isDelete
      callApiDelete={deleleteBlog}
      configFuc={configFuc}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, key: "title" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <ModelSlider isOpen={isOpen} setIsOpen={setIsOpen} listImages={listImages} />
      <FilterBlog />
    </TablePagination>
  )
}

export default Blog
