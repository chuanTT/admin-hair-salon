import { TypeToast } from "@/components/ToastCustom"
import { requestAnimationFrameAccordionInterFace } from "@/types"
import moment from "moment"

const incrementHeight = (progress: number, element?: HTMLDivElement) => {
  if (element) {
    const sectionHeight = progress * element.scrollHeight
    element.style.height = `${sectionHeight}px`
  }
}

const decrementHeight = (progress: number, element?: HTMLDivElement) => {
  if (element) {
    const sectionHeight = element.scrollHeight - progress * element.scrollHeight
    element.style.height = `${sectionHeight > element.scrollHeight ? element.scrollHeight : sectionHeight}px`
    element.style.overflow = "hidden"
  }
}

const requestAnimationFrameAccordion = ({
  element,
  callBackDone,
  callProgress
}: requestAnimationFrameAccordionInterFace) => {
  const start = performance.now()

  if (element) {
    requestAnimationFrame(function animate(time) {
      const runtime = time - start,
        relativeProgress = runtime / 150,
        process = Math.min(relativeProgress, 1)

      if (process < 1) {
        typeof callProgress === "function" && callProgress(process, element)
        requestAnimationFrame(animate)
      }

      if (process === 1) {
        typeof callBackDone === "function" && callBackDone()
      }
    })
  }
}

const isEmptyObj = (obj: { [key: string]: number | string | [] | object }) => {
  if (obj) {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
  }
  return true
}

interface RenderValueProps {
  key: string | string[] | string[][] | undefined
  data: { [key: string]: string | number | object | [] }
  customValue?: ((value: string | number) => string | number) | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customListValue?: ((value: { [key: string]: string | number | object | [] }) => string | number | any) | undefined
}

const RenderValue = ({ key, data, customValue, customListValue }: RenderValueProps) => {
  let v: string | number = ""
  let listValue = {}
  if (Array.isArray(key) && data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let nD: any = data

    key?.forEach((k: string | string[]) => {
      // eslint-disable-next-line no-prototype-builtins
      if (typeof k === "string" && nD?.hasOwnProperty(k)) {
        nD = nD[k]
      } else {
        let t = ""
        if (Array.isArray(k)) {
          k.forEach((value) => {
            if (!isEmptyObj(nD)) {
              // eslint-disable-next-line no-prototype-builtins
              if (nD.hasOwnProperty(value)) {
                t += ` ${nD[value]}`
                listValue = { ...listValue, [value]: nD[value] }
              }
            }
          })
        }
        nD = t
      }
    })
    v = nD
  } else {
    if (typeof key === "string" && data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data?.hasOwnProperty(key)) {
        v = data?.[key] as string | number
      }
    }
  }

  if (typeof customValue === "function") {
    v = customValue(v)
  } else if (typeof customListValue === "function") {
    v = customListValue(listValue)
  }

  if (!v || typeof v === "object" || typeof v === "function") {
    v = "-"
  }

  return v
}

interface STTParameter {
  page?: string | null
  limit?: string | null | undefined
  total?: number
}

interface paginationParameter {
  pagination?: STTParameter
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const STT = (data: paginationParameter | any, index: number) => {
  let stt = 1
  let current_page = 0
  let per_page = 0

  if (data?.pagination) {
    current_page = parseInt(data?.pagination?.page ?? "0")
    per_page = parseInt(data?.pagination?.limit ?? "0")
  }

  let i = (current_page - 1) * per_page
  i = isNaN(i) ? 0 : i
  stt = i + index + 1

  return stt
}

const removeLink = (path: string) => {
  if (path) {
    const checkPath = path.indexOf("/")

    if (checkPath === 0) {
      path = path.slice(1)
    }
  }

  return path
}

const MsgType = (title: string, error = true) => {
  return {
    title,
    type: error ? TypeToast.ERROR : TypeToast.SUCCESS
  }
}

const formatDate = (day: string | number, strFormat = "DD/MM/YYYY") => {
  return moment(day).format(strFormat)
}

const numberMoneyVND = (num: string | number) => {
  let t = "0"
  if (num) {
    t = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  return t
}

const convertNumber = (value: number | string) => {
  if (value) {
    value = value.toString().replace(/[.]/g, "")
    value = value.trim()
    value = Number(value)
  }

  const regex = /^\d*$/
  const check = regex.test(value.toString())
  return {
    value,
    check
  }
}

function convertViToEn(str: number | string, toUpperCase = false) {
  str = String(str)
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, "") // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str
}

const sliceRouteDynamic = (url: string) => {
  const regex = /\/:.+/
  const isVaild = regex.test(url)

  let str = url
  if (isVaild) {
    const index = url.search(regex)

    if (index !== -1) {
      str = url.substring(0, index)
    }
  }

  return str
}

export {
  requestAnimationFrameAccordion,
  decrementHeight,
  incrementHeight,
  STT,
  RenderValue,
  removeLink,
  isEmptyObj,
  MsgType,
  formatDate,
  numberMoneyVND,
  convertNumber,
  convertViToEn,
  sliceRouteDynamic
}
