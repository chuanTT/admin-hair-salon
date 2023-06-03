import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
import { deleleteBlog, getBlog, tableBlog } from "@/api/blogsApi"
import FilterBlog from "@/partials/Blog/FilterBlog"

const Blog = () => {
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
      configFuc={configDefaultEvent}
      customUrl={({ nameTable, query, limit, page, searchValue }) => {
        let url = query?.for(nameTable).page(page).limit(limit)
        const obj = config.filter.other({ searchValue, key: "title" })
        url = url?.params(obj)
        return url?.url()
      }}
    >
      <FilterBlog />
    </TablePagination>
  )
}

export default Blog
