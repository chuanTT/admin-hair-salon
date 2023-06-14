import { FC, Fragment } from "react"
import { NavLink, useLocation } from "react-router-dom"
import config from "@/config"
import AccordionWapper from "@/components/AccordionWapper"
import { CustomRouteConfig } from "@/router/router"
import { usePermissions } from "../PermissonLayout"
import { CheckRolePermissionFuc } from "@/common/fuctionPermission"

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
  const { KeyPermission, permissionArr, nameRole } = usePermissions()
  const keyItem = (Array.isArray(item?.key) ? item?.keyParent : item?.key) ?? ""

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
      callBackUpdate={({ collapseAccordion, expandAccordion, setActive }) => {
        if (checkChildren) {
          if (active) {
            expandAccordion()
            setActive(true)
          } else {
            collapseAccordion()
            setActive(false)
          }

        }
      }}
    >
      {({ refButton, refContent, toggleAccordion }) => {
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
                keyItem && KeyPermission && KeyPermission(keyItem)
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
                    const check = CheckRolePermissionFuc(permissionArr, child, nameRole)

                    return (
                      <Fragment key={`${item.title}-${count}`}>
                        {check && (
                          <NavLink
                            end
                            to={pathChild}
                            className="menu-item"
                            onClick={() => {
                              const keyChild = (Array.isArray(child?.key) ? "" : child?.key) ?? ""
                              KeyPermission && KeyPermission(keyChild || child?.keyParent || keyItem)
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
