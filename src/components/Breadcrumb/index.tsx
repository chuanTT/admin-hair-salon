import { FC, Fragment, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { configSildeBarList, defaultProps } from "@/types"
import { removeLink } from "@/common/functions"
import { configSildeBar } from "@/layout/SlideBar/configSlideBar"

interface optPath {
  title?: string
  path?: string
}

const Breadcrumb: FC<defaultProps> = ({ children }) => {
  const pathName = useLocation()
  const [breadNav, setBreadNav] = useState<optPath[]>([])

  useEffect(() => {
    if (pathName?.pathname) {
      const string = removeLink(pathName?.pathname || "")
      if (string) {
        const arrPt = string.split("/")
        let arrResult: configSildeBarList[] = [...configSildeBar]
        const arrNav: optPath[] = []

        if (Array.isArray(arrPt)) {
          // eslint-disable-next-line @typescript-eslint/no-inferrable-types
          let url: string = ""
          arrPt.forEach((path) => {
            const result = arrResult.find((asider) => {
              const isPath = asider?.to?.indexOf("/") !== -1 ? `/${path}` : path
              return asider?.to === isPath
            })

            if (result !== undefined) {
              let opt: optPath = {
                title: result?.title
              }

              const c = result?.to || "/"
              url += c.indexOf("/") === 0 ? result?.to : `/${result?.to}`
              opt = { ...opt, path: url }
              arrNav.push(opt)
              if (result?.children) {
                arrResult = result?.children
                if (arrPt?.length === 1) {
                  const result = arrResult.find((asider) => {
                    return asider?.to === (null || undefined)
                  })

                  if (result !== undefined) {
                    arrNav.push({
                      title: result?.title
                    })
                  }
                }
              }
            }
          })

          setBreadNav(arrNav)
        }
      }
    }
  }, [pathName])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{breadNav[breadNav?.length - 1]?.title || ""}</h2>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadNav?.map((nav, index) => {
              return (
                <Fragment key={index}>
                  {index < breadNav?.length - 1 && (
                    <li className="breadcrumb-item">
                      <a href={nav?.path}>{nav?.title}</a>
                    </li>
                  )}

                  {index === breadNav?.length - 1 && <li className="breadcrumb-item active">{nav?.title}</li>}
                </Fragment>
              )
            })}
          </ol>
        </nav>
      </div>

      <div>{children}</div>
    </div>
  )
}

export default Breadcrumb
