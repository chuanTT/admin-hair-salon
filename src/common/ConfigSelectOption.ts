import { RoleList } from "@/types"

const LIMIT_SELECT = 50

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const funcKey = (arr: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let option: any[] = []
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      option = [
        ...option,
        {
          value: item?.id,
          label: item?.name
        }
      ]
    })
  }
  return option
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const funcUserKey = (arr: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let option: any[] = []
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      option = [
        ...option,
        {
          value: item?.user_name,
          label: item?.full_name
        }
      ]
    })
  }
  return option
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const funcUserIdKey = (arr: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let option: any[] = []
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      option = [
        ...option,
        {
          value: item?.id,
          label: item?.full_name
        }
      ]
    })
  }
  return option
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const funcKeyRole = (arr: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let option: any[] = []
  if (Array.isArray(arr)) {
    const AllowRoles = [RoleList.ROOT]
    arr.forEach((item) => {
      if (!AllowRoles.includes(item?.name)) {
        option = [
          ...option,
          {
            value: item?.id,
            label: item?.name
          }
        ]
      }
    })
  }
  return option
}

const configAll = (key = "full_name", keyValue = "user_name") => {
  return {
    [keyValue]: -1,
    [key]: "Tất cả"
  }
}

const optionAddAll = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arr: any[],
  option = {
    id: -1,
    name: "Tất cả"
  }
) => {
  const result = [option, ...arr]

  return result
}

export { funcKey, LIMIT_SELECT, optionAddAll, funcKeyRole, funcUserKey, configAll, funcUserIdKey }
