import { FC, Fragment } from "react"
import { NavLink, useLocation } from "react-router-dom"

import { configSildeBarList } from "@/types"
import config from "@/config"
import AccordionWapper from "@/components/AccordionWapper"

interface MenuItemProps {
  item: configSildeBarList
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const checkChildren = item?.children && Array.isArray(item?.children) && item?.children.length > 0
  const Icon = item?.icon || Fragment
  const location = useLocation()
  const path = item?.to || config.router.home
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
      callBackUpdate={(toggleAccordion, activeToggle) => {
        if (active) {
          if (checkChildren) {
            if (!activeToggle) {
              toggleAccordion()
            }
          }
        } else {
          if (activeToggle && checkChildren) {
            toggleAccordion()
          }
        }
      }}
      isUpdate={active}
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
              }}
            >
              <div className="menu-icon">
                <Icon />
              </div>
              <div>{item.title}</div>
            </NavLink>

            {checkChildren && (
              <div className="menu-sub !block h-0 overflow-hidden" ref={refContent}>
                {item?.children &&
                  item?.children.map((child, count) => {
                    const acceptPath = path === config.router.home
                    const pathChild = `${path}${child?.to ? (acceptPath ? child.to : "/" + child.to) : ""}`
                    return (
                      <NavLink end to={pathChild} className="menu-item" key={`${item.title}-${count}`}>
                        <span className="menu-link">
                          <div data-i18n="Without navbar">{child.title}</div>
                        </span>
                      </NavLink>
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
