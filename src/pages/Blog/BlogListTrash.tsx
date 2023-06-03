import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
import FilterBlog from "@/partials/Blog/FilterBlog"
import { deleleteBlog, getBlog, tableBlog } from "@/api/blogsApi"

const BlogListTrash = () => {
  return (
    <TablePagination
      selectCheck={{
        views: true
      }}
      configDetail={config.table.configProduct}
      nameTable={tableBlog}
      callApi={getBlog}
      isDelete
      callApiDelete={deleleteBlog}
      configFuc={configDefaultEvent}
      is_force={1}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(`${nameTable}`).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, is_deleted: true, key: "title" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <FilterBlog />
    </TablePagination>
  )
}

export default BlogListTrash
