import { FC, Fragment, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { defaultProps } from "@/types"
import { fucBreadCrumb } from "@/common/functions"

export interface optPath {
  title?: string
  path?: string
  key?: string | string[]
  keyParent?: string
}

const Breadcrumb: FC<defaultProps> = ({ children }) => {
  const pathName = useLocation()
  // const check = useMatches()
  const [breadNav, setBreadNav] = useState<optPath[]>([])

  useEffect(() => {
    fucBreadCrumb({
      path: pathName?.pathname,
      callEndLoop: (config) => {
        setBreadNav(config ?? [])
      }
    })
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
