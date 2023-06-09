import { useState, useContext, createContext, FC, useMemo } from "react"
import useFetchingApi, { customUrlProps } from "@/hooks/useFetchingApi"
import Breadcrumb from "@/components/Breadcrumb"
import { TablePaginationProps, TypeValue, paginationType, typeObject } from "@/types"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import ModalDeleteCus from "@/components/ModalDeleteCus"
import Portal from "@/components/Portal"
import { LIMIT_SELECT } from "@/common/ConfigSelectOption"
import { usePermissions } from "../PermissonLayout"

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
    is_force,
    is_restore,
    callBack,
    is_checkEvent = false
  } = prop

  const { checkEvent, nameRole } = usePermissions()

  // search nâng cao
  const [searchValue, setSearchValue] = useState<{ [key: string]: string | number | boolean }>({})
  // const [updated, setUpdated] = useState(false)

  // paging
  const [page, setPage] = useState(pageStart)
  const [limit] = useState(LimitPages || LIMIT_SELECT)

  // modal
  const [isOpen, setIsOpen] = useState(false)

  // get id
  const [listIDs, setListIDs] = useState<(number | string)[]>([])

  const { data, isFetched, invalidateQueriesQueryClient } = useFetchingApi({
    nameTable: nameTable || "",
    CallAPi: callApi,
    page,
    limit,
    retry: 1,
    customUrl: (object: customUrlProps) => {
      return (typeof customUrl === "function" && customUrl(object)) || ""
    },
    searchValue
    //
  })

  const pagination: paginationType = data?.data?.pagination

  const handelDelete = (id: number | string, isPush?: boolean) => {
    if (isPush) {
      setListIDs((prev) => {
        const newData = [...prev]
        if (newData?.includes(id)) {
          return newData?.filter((item) => item !== id)
        }
        return [...newData, id]
      })
    } else {
      setListIDs([id])
      setIsOpen(true)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handelDeleteAll = (data: any) => {
    if (data?.data) {
      const { data: result } = data
      if (result) {
        const maxLength = result?.length
        const itemLength = listIDs?.length

        if (maxLength === itemLength) {
          setListIDs([])
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setListIDs(() => result?.map((item: any) => item?.id))
        }
      }
    }
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
      setPage,
      handelFilter,
      searchValue,
      isOpen,
      setIsOpen,
      limit,
      listIDs,
      handelDeleteAll,
      isFetched
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, listIDs, searchValue, isFetched])

  typeof callBack === "function" && callBack(values)

  return (
    <TablePaginationContext.Provider value={values}>
      {isFetched &&
        isDelete &&
        callApiDelete &&
        (is_checkEvent || (!is_checkEvent && checkEvent && checkEvent?.DELETE)) && (
          <Portal>
            <ModalDeleteCus
              id={listIDs}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              callApiDelete={callApiDelete}
              is_force={is_force}
              is_restore={is_restore}
              SuccessModal={() => {
                setListIDs([])
                invalidateQueriesQueryClient()
              }}
            />
          </Portal>
        )}

      <Breadcrumb>
        {children}
        <Table
          data={data?.data}
          isStt={isStt}
          configFuc={configFuc}
          isFuc={isFuc}
          selectCheck={selectCheck}
          configDetail={configDetail}
          provider={values}
          checkEvents={checkEvent}
          nameRole={nameRole}
        />
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
  const data: TypeValue = useContext(TablePaginationContext)
  return data
}

export default TablePagination
