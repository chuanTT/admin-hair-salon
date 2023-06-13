import TablePagination from "@/layout/TablePagination"
import config from "@/config"
import { DeteleFuc, EventClickButton, RestoreFuc } from "@/config/configEvent"
import { RecoveryBlog, deleleteBlog, getBlog, tableBlog } from "@/api/blogsApi"
import FilterBlogTrash from "@/partials/Blog/FilterBlogTrash"
import { useMemo, useState } from "react"
import PermissonCheckLayout from "@/layout/PermissonCheckLayout"
import { Event, RoleList } from "@/types"

const BlogListTrash = () => {
  const [isRestore, setIsRestore] = useState(false)

  const configFuc = useMemo(
    () => [
      { ...RestoreFuc, onClick: EventClickButton(() => setIsRestore(true)) },
      { ...DeteleFuc, onClick: EventClickButton(() => setIsRestore(false)) }
    ],
    []
  )

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <PermissonCheckLayout event={Event.READ} role={[RoleList.ADMIN, RoleList.ROOT]}>
      <TablePagination
        selectCheck={{
          views: true
        }}
        configDetail={config.table.configBlog}
        nameTable={tableBlog}
        callApi={getBlog}
        isDelete
        callApiDelete={isRestore ? RecoveryBlog : deleleteBlog}
        configFuc={configFuc}
        is_force={1}
        is_restore={isRestore}
        customUrl={({ nameTable, query, limit, page, searchValue }) => {
          let url = query?.for(`${nameTable}`).page(page).limit(limit)
          const obj = config.filter.other({ searchValue, is_deleted: true, key: "title" })
          url = url?.params(obj)
          return url?.url()
        }}
      >
        <FilterBlogTrash setIsRestore={setIsRestore} />
      </TablePagination>
    </PermissonCheckLayout>
  )
}

export default BlogListTrash
