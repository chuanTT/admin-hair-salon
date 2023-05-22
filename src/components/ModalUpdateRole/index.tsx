import { useState, useRef, FC, Dispatch, SetStateAction, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import _ from "lodash"
import ToastCustom, { TypeToast } from "../ToastCustom"
import Modal from "../Modal"
import { MsgType } from "@/common/functions"
import Button from "../Button"
import useFetchingApi from "@/hooks/useFetchingApi"
import { getPermissionsList, getRoles, tableRole, updatePermissions } from "@/api/rolesApi"
import { PermissionDefault, RoleDefault, UpdateRole } from "@/types"
import Loading from "../Loading"

interface ModalDeleteCusProps {
  isOpen: boolean
  id: string | number
  setIsOpen: Dispatch<SetStateAction<boolean>>
  msgObj?: {
    erorr?: string
    suss?: string
  }
  onSuccessModal?: () => void
  SuccessModal?: () => void
  sussFucMsg?: () => void
}

const ModalUpdateRole: FC<ModalDeleteCusProps> = ({
  isOpen,
  id,
  setIsOpen,
  msgObj,
  onSuccessModal,
  SuccessModal
}) => {
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const msgToast = useRef({ title: "", type: TypeToast.WARN })
  const [permissions, setPermissions] = useState<UpdateRole[]>([])

  const { data, refetch, isFetched } = useFetchingApi({
    nameTable: tableRole,
    CallAPi: getRoles,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false
    },
    isConfig: false,
    customUrl: ({ query, nameTable }) => {
      return query?.for(`${nameTable}/${id}`)?.includes("permissions").url()
    }
  })

  useEffect(() => {
    if (data?.data?.permissions) {
      const { permissions: permissionsList }: { permissions: PermissionDefault[] } = data.data

      if (Array.isArray(permissionsList)) {
        const newPermissions: UpdateRole[] = []
        permissionsList.forEach((per) => {
          const newEvent = per?.events ? per?.events?.map((ev) => ev.id) : []
          newPermissions.push({
            permission_id: per.id,
            event: newEvent
          })
        })

        setPermissions(newPermissions)
      }
    }
  }, [data])

  const { data: dataPermissions } = useFetchingApi({
    nameTable: "test",
    CallAPi: getPermissionsList,
    customUrl: ({ query, nameTable }) => query?.for(nameTable).url()
  })

  const resetPending = () => {
    setIsPending(false)
    setIsOpenToast(true)
    setIsOpen(false)
  }

  useEffect(() => {
    if (id !== 0) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // delete
  const { mutate } = useMutation({
    mutationFn: (data: UpdateRole[]) => {
      return updatePermissions(id, data)
    },
    onError: () => {
      msgToast.current = MsgType(msgObj?.erorr ?? "Update thất bại")
      resetPending()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      msgToast.current = MsgType(msgObj?.suss ?? "Update thành công", false)
      if (context) {
        if (context?.code === 400 || context?.code === 403) {
          msgToast.current = MsgType(context?.msg ?? msgObj?.erorr ?? "Update thất bại")
        }
      }

      msgToast.current.type === TypeToast.SUCCESS && typeof SuccessModal == "function" && SuccessModal()
      typeof onSuccessModal == "function" && onSuccessModal()
      resetPending()
    }
  })

  const submitUpdate = () => {
    mutate(permissions)
    setIsPending(true)
  }

  return (
    <ToastCustom
      isOpenToast={isOpenToast}
      title={msgToast.current.title}
      type={msgToast.current.type}
      timeEnd={1000}
      CloseEvent={() => {
        setIsOpenToast(false)
        if (msgToast.current.type === TypeToast.SUCCESS) {
          refetch()
        }
      }}
    >
      <Modal
        classModalWidth="max-sm:w-[90%] sm:w-[80%] !max-w-none"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isClose={isPending}
      >
        {!isFetched && (
          <div className="flex justify-center [&>*]:scale-50 items-start">
            <Loading />
          </div>
        )}

        {isFetched && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-sm font-semibold text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                  <tr className="[&>*]:border [&>*]:border-solid">
                    <th className="px-2 py-3 whitespace-nowrap border border-solid font-semibold text-center">
                      Chức năng
                    </th>
                    {dataPermissions?.data?.events &&
                      dataPermissions?.data?.events?.map((event: RoleDefault, index: number) => {
                        return (
                          <th
                            key={event?.id ?? index}
                            className="px-2 py-3 whitespace-nowrap border border-solid font-semibold text-center"
                          >
                            {event?.name}
                          </th>
                        )
                      })}
                  </tr>
                </thead>

                <tbody className="text-sm divide-y divide-slate-200 bg-white">
                  {dataPermissions?.data?.permissions &&
                    dataPermissions?.data?.permissions?.map((permission: RoleDefault, index: number) => {
                      const newPer = permissions.find((item) => item?.permission_id === permission?.id)
                      return (
                        <tr className="[&>*]:border [&>*]:border-solid" key={permission?.id ?? index}>
                          <td className="px-2 py-3 whitespace-nowrap font-medium">{permission?.name}</td>
                          {dataPermissions?.data?.events &&
                            dataPermissions?.data?.events?.map((event: RoleDefault, index: number) => {
                              const newEvent = newPer?.event ? newPer?.event ?? [] : []
                              return (
                                <td className="px-2 py-3 whitespace-nowrap" key={event?.id ?? index}>
                                  <div className="form-check d-flex justify-content-center cursor-pointer">
                                    <input
                                      className="form-check-input cursor-pointer"
                                      type="checkbox"
                                      id="defaultCheck1"
                                      checked={newEvent ? newEvent?.includes(event?.id) : false}
                                      onChange={() => {
                                        let newPermissions = [...permissions]
                                        const isPerMatch = _.findIndex(newPermissions, {
                                          permission_id: permission?.id
                                        })

                                        if (isPerMatch === -1) {
                                          newPermissions = [
                                            ...permissions,
                                            { permission_id: permission?.id, event: [event.id] }
                                          ]
                                        } else {
                                          let events = newPermissions[isPerMatch]?.event

                                          if (events && Array.isArray(events)) {
                                            if (events.includes(event.id)) {
                                              events = events.filter((evt) => evt !== event?.id)
                                              newPermissions[isPerMatch] = {
                                                ...newPermissions[isPerMatch],
                                                event: events
                                              }
                                            } else {
                                              newPermissions[isPerMatch] = {
                                                ...newPermissions[isPerMatch],
                                                event: [...events, event?.id]
                                              }
                                            }
                                          }
                                        }

                                        setPermissions(() => newPermissions)
                                      }}
                                    />
                                  </div>
                                </td>
                              )
                            })}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex max-sm:justify-center flex-row-reverse gap-2">
              <span className="flex rounded-md shadow-sm sm:mt-0 sm:w-fit ">
                <Button
                  isPending={isPending}
                  onClick={submitUpdate}
                  customClass="flex items-center space-x-2  font-bold py-2 px-4 border !rounded bg-blue-icon bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Lưu lại
                </Button>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </ToastCustom>
  )
}

export default ModalUpdateRole
