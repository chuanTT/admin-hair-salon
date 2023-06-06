import { FC, Fragment } from "react"
import { NavLink, useLocation } from "react-router-dom"
import config from "@/config"
import AccordionWapper from "@/components/AccordionWapper"
import { CustomRouteConfig } from "@/router/router"

interface MenuItemProps {
  item: CustomRouteConfig
  titleDefault?: string
}

const MenuItem: FC<MenuItemProps> = ({ item, titleDefault }) => {
  const checkChildren = item?.children && Array.isArray(item?.children) && item?.children.length > 0
  const Icon = item?.icon || Fragment
  const location = useLocation()
  const path = item?.path || config.router.home
  const pathname =
    path.length === config.router.home.length ? location?.pathname : location?.pathname?.substring(0, path.length)
  const active = pathname === path

  return (
    <AccordionWapper
      customProgressOpen={(element) => {
        const parent = element?.parentElement
        if (!parent?.classList?.contains("open")) {
          parent?.classList.add("open")
        }
      }}
      customFucCloseDone={(element) => {
        const parent = element?.parentElement
        if (parent?.classList?.contains("open")) {
          parent?.classList.remove("open")
        }
      }}
      callBackUpdate={({ active: activeToggle, collapseAccordion, expandAccordion, setActive }) => {
        if (active) {
          if (!activeToggle) {
            expandAccordion()
            setActive(true)
          }
        } else {
          if (activeToggle) {
            collapseAccordion()
            setActive(false)
          }
        }
      }}
      isUpdate={active}
    >
      {({ refButton, refContent, toggleAccordion, setUpdated }) => {
        return (
          <li className={`menu-item ${active ? "active" : ""}`}>
            <NavLink
              to={path}
              className={`menu-link font-semibold ${checkChildren ? "menu-toggle" : ""}`}
              ref={refButton as React.RefObject<HTMLAnchorElement>}
              onClick={(e) => {
                if (checkChildren) {
                  e.preventDefault()
                  typeof toggleAccordion === "function" && toggleAccordion()
                  return
                }
                setUpdated && setUpdated((prev) => !prev)
              }}
            >
              <div className="menu-icon">
                <Icon />
              </div>
              <div>{item.title ?? titleDefault}</div>
            </NavLink>

            {checkChildren && (
              <div className="menu-sub !block h-0 overflow-hidden" ref={refContent}>
                {item?.children &&
                  item?.children.map((child, count) => {
                    const acceptPath = path === config.router.home
                    const pathChild = `${path}${child?.path ? (acceptPath ? child.path : "/" + child.path) : ""}`
                    const isRenderChil = child?.isNoRender
                    return (
                      <Fragment key={`${item.title}-${count}`}>
                        {!isRenderChil && (
                          <NavLink
                            end
                            to={pathChild}
                            className="menu-item"
                            onClick={() => {
                              setUpdated && setUpdated((prev) => !prev)
                            }}
                          >
                            <span className="menu-link">
                              <div data-i18n="Without navbar">{child.title}</div>
                            </span>
                          </NavLink>
                        )}
                      </Fragment>
                    )
                  })}
              </div>
            )}
          </li>
        )
      }}
    </AccordionWapper>
  )
}

export default MenuItem
