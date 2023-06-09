import { iconTypeEvent } from "@/components/Button"
import { customUrlProps } from "@/hooks/useFetchingApi"
import { AxiosResponse } from "axios"
import { Dispatch, HTMLAttributes, MouseEvent, ReactNode, SetStateAction } from "react"

export interface defaultProps {
  children?: ReactNode
}

export interface configSildeBarList {
  title?: string
  to?: string
  children?: configSildeBarList[]
  isHeader?: boolean
  icon?: () => JSX.Element
}

export interface requestAnimationFrameAccordionInterFace {
  element?: HTMLDivElement | null
  callBackDone?: () => void
  callProgress?: (process: number, element?: HTMLDivElement) => void
}

export interface LoadValueCustomProps {
  data?: string | number | undefined
  type?: boolean
  element?: (props: typeElment) => JSX.Element
  innerProps?: HTMLAttributes<HTMLElement> | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current?: any
}

export interface typeElment {
  innerProps?: HTMLAttributes<HTMLElement> | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current?: any
  data?: string | number | undefined
}

export interface elementProps {
  innerProps?: HTMLAttributes<HTMLElement> | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current?: any
  data?: string | number | undefined
  type?: boolean
}

export interface configProps {
  key?: string | string[] | string[][]
  head: string
  isStt?: boolean
  isCus?: boolean
  status?: boolean
  element?: (props: typeElment) => JSX.Element
  col?: number
  row?: number
  innerPropsThead?: HTMLAttributes<HTMLElement>
  innerPropsBody?: HTMLAttributes<HTMLElement>
  innerPropChild?: HTMLAttributes<HTMLElement>
  classBodyCus?: HTMLAttributes<HTMLElement>["className"]
  classCustom?: HTMLAttributes<HTMLElement>["className"]
  customValue?: (value: string | number) => string | number
  customListValue?: () => string | number
}

export interface selectCheckProps {
  views?: boolean
  key?: string
}

export interface dataProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[]
  pagination?: paginationType
}

export interface configFucProps {
  id?: string
  content?: string
  isIconEdit?: boolean
  customClass?: string
  key?: string
  isViews?: boolean
  to?: string
}

export interface typeObject {
  [key: string]: string | number | boolean
}

export interface typeObjectAdv {
  [key: string]: string | number | Blob | FileList
}

export interface TypeValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: AxiosResponse<any, any> | undefined
  handelDelete?: (id: number | string, isPush?: boolean) => void
  setSearchValue?: Dispatch<SetStateAction<typeObject>>
  setPage?: Dispatch<SetStateAction<number | undefined>>
  handelFilter?: (value: typeObject) => void
  searchValue?: typeObject
  limit?: number
  listIDs?: (number | string)[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handelDeleteAll?: (data: any) => void
  isFetched?: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

export interface typeEventClick {
  id: number | string
  e?: MouseEvent<HTMLElement>
  provider?: TypeValue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

export interface typeEvent {
  id?: string
  content?: string
  customClass?: string
  key?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isViews?: boolean | ((checkEvents?: TypeEventPermission, typeEvent?: Event, role?: any[], nameRole?: string) => boolean)
  to?: string
  type?: iconTypeEvent
  onClick?: (obj: typeEventClick) => void
  isCus?: boolean
  typeEvent?: Event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role?: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: (props: any) => JSX.Element
}

export interface TablePaginationProps extends TableProps {
  children?: ReactNode
  nameTable?: string
  pageStart?: number
  LimitPages?: number
  isDelete?: boolean
  is_force?: number | string
  is_restore?: boolean
  is_checkEvent?: boolean
  customUrl?: (obj: customUrlProps) => string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApiDelete?: (id: (number | string)[]) => Promise<AxiosResponse<any, any>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApi?: (url: string) => Promise<AxiosResponse<any, any>>
  callBack?: (values: TypeValue) => void
}

export interface TableProps {
  //   config?: array;
  configDetail: configProps[][]
  isFuc?: boolean
  isStt?: boolean
  selectCheck?: selectCheckProps
  data?: dataProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configFuc?: typeEvent[]
  provider?: TypeValue
  checkEvents?: TypeEventPermission
  nameRole?: string
  isTransparent?: boolean
}

export interface paginationType {
  page: number
  limit: number
  total: number
}

export interface TbodyProps {
  data?: dataProps
  selectCheck?: selectCheckProps
  isStt?: boolean
  isFuc?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configFuc?: typeEvent[]
  provider?: TypeValue
  render: configProps[]
  checkEvents?: TypeEventPermission
  nameRole?: string
}

export interface RoleDefault {
  id?: number
  name?: string
}

export interface PermissionDefault extends RoleDefault {
  events?: RoleDefault[]
}

export interface RoleResponsive extends RoleDefault {
  permissions: PermissionDefault[]
}

export interface UpdateRole {
  permission_id?: number
  event?: (number | undefined | string)[]
}

export interface SelectDefault {
  value?: string | number
  label?: string | number
}

export interface userProps {
  id?: number
  user_name?: string
  full_name?: string
  avatar?: string
  role?: RoleResponsive
}

export interface dataProvider {
  user?: userProps
  token?: string
  setUser?:  Dispatch<SetStateAction<userProps>>
  saveAuth?: () => void
  removeAuth?: () => void
}

export interface valueProps {
  data?: userProps
}

export interface dataInter extends valueProps {
  code?: number
  msg?: string
}

export interface FilterTrashProps {
  setIsRestore?: Dispatch<SetStateAction<boolean>>
}

export enum RoleList {
  ROOT = "ROOT",
  ADMIN = "ADMIN",
  USER = "USER"
}

export enum Event {
  READ = "READ",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export enum PermissionInterFace {
  PRODUCT = "PRODUCT",
  USER = "USER",
  BLOG = "BLOG",
  SILDE_PRODUCT = "SILDE_PRODUCT",
  ROLE = "ROLE"
}

export interface TypeEventPermission {
  [Event.CREATE]: boolean
  [Event.READ]: boolean
  [Event.UPDATE]: boolean
  [Event.DELETE]: boolean
}
