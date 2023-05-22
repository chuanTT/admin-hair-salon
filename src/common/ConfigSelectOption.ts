import _ from "lodash"

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
const unineArrayOption = (key: string, ...rest: any) => {
  const newProductNew = _.unionBy(...rest, key)

  return newProductNew
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

export { funcKey, LIMIT_SELECT, unineArrayOption, optionAddAll }
