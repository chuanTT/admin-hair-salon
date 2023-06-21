import { FC, Fragment } from "react"
import { defaultProps } from "@/types"
import { useProviderSettings } from "@/layout/ProviderSettings"

export interface optPath {
  title?: string
  path?: string
  key?: string | string[]
  keyParent?: string
}

const Breadcrumb: FC<defaultProps> = ({ children }) => {
  const { breadNav } = useProviderSettings()

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-xl font-medium">{(breadNav && breadNav[breadNav?.length - 1]?.title) || ""}</h2>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadNav && breadNav?.length > 1 &&
              breadNav?.map((nav, index) => {
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
