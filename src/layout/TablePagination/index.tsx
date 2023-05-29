import { useState, useRef, useContext, createContext, FC, useMemo } from "react"
import useFetchingApi, { customUrlProps } from "@/hooks/useFetchingApi"
import Breadcrumb from "@/components/Breadcrumb"
import { TablePaginationProps, TypeValue, paginationType, typeObject } from "@/types"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import Loading from "@/components/Loading"
import ModalDeleteCus from "@/components/ModalDeleteCus"
import Portal from "@/components/Portal"

const TablePaginationContext = createContext({})

const TablePagination: FC<TablePaginationProps> = (prop) => {
  const {
    children,
    customUrl,
    callApi,
    nameTable,
    pageStart,
    LimitPages,
    isDelete,
    callApiDelete,
    configDetail,
    configFuc,
    isStt,
    isFuc,
    selectCheck,
    callBack
  } = prop

  // search nâng cao
  const [searchValue, setSearchValue] = useState<{ [key: string]: string | number }>({})
  // const [updated, setUpdated] = useState(false)

  // paging
  const [page, setPage] = useState(pageStart)
  const [limit] = useState(LimitPages)

  // modal
  const [isOpen, setIsOpen] = useState(false)

  // get id
  const idItem = useRef<number | string>()

  const { data, isFetched, invalidateQueriesQueryClient } = useFetchingApi({
    nameTable: nameTable || "",
    CallAPi: callApi,
    page,
    limit,
    retry: 1,
    customUrl: (object: customUrlProps) => {
      return (typeof customUrl === "function" && customUrl(object)) || ""
    }
    // searchValue
  })

  const pagination: paginationType = data?.data?.pagination

  const handelDelete = (id: number | string) => {
    setIsOpen((prev) => !prev)
    idItem.current = id
  }

  const handelFilter = (value: typeObject) => {
    setSearchValue((prev) => ({ ...prev, ...value }))
    setPage(1)
  }

  const values: TypeValue = useMemo(() => {
    return {
      data,
      handelDelete,
      setSearchValue,
      id: idItem?.current,
      setPage,
      handelFilter,
      searchValue,
      isOpen,
      setIsOpen
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  typeof callBack === "function" && callBack(values)

  return (
    <TablePaginationContext.Provider value={values}>
      {isFetched && isDelete && callApiDelete && (
        <Portal>
          <ModalDeleteCus
            id={idItem.current || 0}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            callApiDelete={callApiDelete}
            sussFucMsg={() => {
              invalidateQueriesQueryClient()
            }}
          />
        </Portal>
      )}

      <Breadcrumb>
        {!isFetched && (
          <div className="flex justify-center [&>*]:scale-50 items-start">
            <Loading />
          </div>
        )}

        {isFetched && (
          <>
            {children}
            <Table
              data={data?.data}
              isStt={isStt}
              configFuc={configFuc}
              isFuc={isFuc}
              selectCheck={selectCheck}
              configDetail={configDetail}
              provider={values}
            />
          </>
        )}
        {isFetched && pagination && (
          <div className="mt-8 flex justify-end">
            <Pagination
              perPages={pagination.page}
              limitPages={pagination.limit}
              totalPages={pagination.total}
              onPagesChanges={(pages: number) => {
                setPage(pages)
              }}
            />
          </div>
        )}
      </Breadcrumb>
    </TablePaginationContext.Provider>
  )
}

export const useTablePagination = () => {
  const data: TypeValue  = useContext(TablePaginationContext)
  return data
}

export default TablePagination
