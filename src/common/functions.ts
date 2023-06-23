import { optPath } from "@/components/Breadcrumb"
import { TypeToast } from "@/components/ToastCustom"
import config from "@/config"
import { AUTH_LS_KEY } from "@/constants/LocalStorage"
import { dataSettingsApi } from "@/layout/ProviderSettings"
import { CustomRouteConfig, router, typeRouter } from "@/router/router"
import { requestAnimationFrameAccordionInterFace, typeEvent, typeObject } from "@/types"
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

const isEmptyObj = (obj: typeObject) => {
  let emty = true
  if (obj) {
    emty = Object.keys(obj).length === 0 && obj.constructor === Object
  }
  return emty
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

const NowDate = () => {
  const d = moment().format("DD/MM/YYYY")

  return d
}

export const lsAuth = () => {
  if (!localStorage) {
    return
  }

  const lsValue = localStorage.getItem(AUTH_LS_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth = JSON.parse(lsValue)
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error)
  }
}

export const lsRemoveAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LS_KEY)
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeProperty = (propKey: string | number, { [propKey]: propValue, ...rest }) => rest

const fucPathName = (str: string) => {
  const arr = str?.split("/")
  const strNew = arr?.[arr?.length - 1] ?? str
  return strNew
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (obj: any) => {
  let isCheck = false

  if (typeof obj === "object" && !Array.isArray(obj)) {
    isCheck = true
  }

  return isCheck
}

const getPrivateRouter = () => {
  const privateRole = router?.[0]?.children?.find((itemRouter) => itemRouter?.type === typeRouter.private)
  const childrenRouter = privateRole ? privateRole?.children || [] : []
  return {
    childrenRouter,
    privateRole
  }
}

const fucFirtsChart = (str?: string) => {
  let newStr = ""
  if (str) {
    newStr = str.charAt(0).toUpperCase() + str.slice(1)
  }
  return newStr
}

const fucStyleCovert = (str?: string) => {
  let strKey = ""
  if (str) {
    const keyNew = str?.split("-")
    if (keyNew?.length > 1) {
      keyNew?.forEach((newK, index) => {
        if (index > 0) {
          strKey += fucFirtsChart(newK)
        } else {
          strKey += newK
        }
      })
    } else if (keyNew?.length === 0) {
      strKey = keyNew?.[0] ?? ""
    }
  }

  return strKey
}

interface setStyleImageSettingsPar {
  logo?: dataSettingsApi["logo"]
  callback?: (src?: string) => void
  callLoop?: (key: string, value?: string) => void
}

const setStyleImageSettings = ({ logo, callback, callLoop }: setStyleImageSettingsPar) => {
  let settingsStyle = {}
  if (logo) {
    const { src, settings } = logo

    if (settings && isObject(settings)) {
      const arrKey = Object.keys(settings)

      arrKey.forEach((key) => {
        callLoop && callLoop(key, settings?.[key])
        // setValue(key, settings?.[key])
        if (key && settings) {
          const strKey = fucStyleCovert(key)
          settingsStyle = { ...settingsStyle, [strKey]: settings?.[key] }
        }
      })
    }

    callback && callback(src)
  }

  return settingsStyle
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkViewsFuc = (configFuc?: typeEvent[], checkEvents?: any, nameRole?: string): boolean => {
  let isFucViews = true
  if (configFuc && checkEvents) {
    const filterTypeEvent = configFuc.filter((config) => {
      if (!config.typeEvent || !config.role) {
        return true
      }
    })
    if (filterTypeEvent?.length === 0) {
      const filterCheckEvent = configFuc.find((config) => {
        const type = config.typeEvent ?? ""
        let isCheck = false
        if (type) {
          isCheck = checkEvents?.[type]
        }
        if(config?.role && Array.isArray(config?.role)) {
          isCheck = config.role.includes(nameRole)
        }
        return isCheck
      })
      if (!filterCheckEvent) {
        isFucViews = false
      }
    }
  }

  return isFucViews
}

interface fucBreadCrumbPraram {
  path?: string
  callOptCustom?: (config?: CustomRouteConfig) => optPath
  callOptChild?: (config?: CustomRouteConfig) => optPath
  callEndLoop?: (config?: optPath[]) => void
}

const fucBreadCrumb = ({ path, callEndLoop, callOptChild, callOptCustom }: fucBreadCrumbPraram) => {
  if (path) {
    const isMatches = config.router.home === path
    const string = isMatches ? path : removeLink(path || "")
    if (string) {
      const arrPt = isMatches ? string : string.split("/")
      const { childrenRouter } = getPrivateRouter()
      let arrResult: CustomRouteConfig[] = [...childrenRouter]
      const arrNav: optPath[] = []

      if (Array.isArray(arrPt)) {
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        let url: string = ""
        arrPt.forEach((path) => {
          const result = arrResult.find((asider) => {
            const isPath = asider?.path?.indexOf("/") !== -1 ? `/${path}` : path
            return asider?.path === isPath
          })

          if (result !== undefined) {
            let opt: optPath = (callOptCustom && callOptCustom(result)) || {
              title: result?.title
            }

            const c = result?.path || "/"
            url += c.indexOf("/") === 0 ? result?.path : `/${result?.path}`
            opt = { ...opt, path: url }
            const isCheck = arrNav.find((item) => item?.title === result?.title)
            if (!isCheck) {
              arrNav.push(opt)
            }
            if (result?.children) {
              arrResult = result?.children
              if (arrPt?.length > 0) {
                const resultCheck = arrResult.find((asider) => {
                  const indexPath = asider?.path?.search(/\/:[a-z]*/)
                  const newPath = indexPath !== -1 ? asider?.path?.substring(0, indexPath) : asider?.path
                  return arrPt.includes(newPath || "") && !asider?.index
                })

                if (resultCheck === undefined) {
                  const dataNav = arrResult.find((item) => !item?.path)
                  const optChild = (callOptChild && callOptChild(dataNav)) || {
                    title: dataNav?.title
                  }
                  arrNav.push(optChild)
                } else {
                  const isCheck = arrNav.find((item) => item?.title === resultCheck.title)

                  if (!isCheck) {
                    const optChild = (callOptChild && callOptChild(resultCheck)) || {
                      title: resultCheck?.title
                    }
                    arrNav.push(optChild)
                  }
                }
              }
            }
          }
        })

        callEndLoop && callEndLoop(arrNav)
      } else {
        const result = arrResult?.find((itemResult) => itemResult?.index || itemResult?.path === config.router.home)

        if (result) {
          const optChild = (callOptChild && callOptChild(result)) || {
            title: result?.title
          }
          arrNav.push(optChild)
          callEndLoop && callEndLoop(arrNav)
        }
      }
    }
  }
}


function DateMothYear(date = "") {
  let d = moment();
  if (date) d = moment(date);

  return {
    d,
    y: d.year(),
    m: d.month() + 1,
  };
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
  sliceRouteDynamic,
  NowDate,
  removeProperty,
  fucPathName,
  isObject,
  getPrivateRouter,
  setStyleImageSettings,
  fucFirtsChart,
  fucStyleCovert,
  checkViewsFuc,
  fucBreadCrumb,
  DateMothYear
}
