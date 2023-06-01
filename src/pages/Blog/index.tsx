import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { configDefaultEvent } from "@/config/configEvent"
import { deleleteBlog, getBlog, tableBlog } from "@/api/blogsApi"

const Blog = () => {
  return (
    <TablePagination
      configDetail={config.table.configBlog}
      nameTable={tableBlog}
      callApi={getBlog}
      isDelete
      // callApiDelete={deleleteBlog}
      configFuc={configDefaultEvent}
      customUrl={({ nameTable, query, limit, page }) => {
        return query?.for(nameTable).page(page).limit(limit).url()
      }}
    />
  )
}

export default Blog
