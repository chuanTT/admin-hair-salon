import { FC, Fragment, useEffect, useState } from "react"
import { useLocation, useMatches } from "react-router-dom"
import { defaultProps } from "@/types"
import { removeLink } from "@/common/functions"
import { CustomRouteConfig, router, typeRouter } from "@/router/router"

interface optPath {
  title?: string
  path?: string
}

const Breadcrumb: FC<defaultProps> = ({ children }) => {
  const pathName = useLocation()
  const check = useMatches() 

  console.log(check)
  const [breadNav, setBreadNav] = useState<optPath[]>([])

  useEffect(() => {
    if (pathName?.pathname) {
      const string = removeLink(pathName?.pathname || "")
      if (string) {
        const arrPt = string.split("/")
        const privateRole = router.find((itemRouter) => itemRouter?.type === typeRouter.private)
        const childrenRouter = privateRole ? privateRole.children ?? [] : []
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
              let opt: optPath = {
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
                    arrNav.push({
                      title: dataNav?.title
                    })
                  } else {
                    const isCheck = arrNav.find((item) => item?.title === resultCheck.title)

                    if (!isCheck) {
                      arrNav.push({
                        title: resultCheck?.title
                      })
                    }
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
      <div className="flex items-center justify-between flex-wrap">
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
