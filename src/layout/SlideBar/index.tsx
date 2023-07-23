import { Fragment, useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import config from "@/config"
import MenuItem from "./MenuItem"
import { getPrivateRouter, setStyleImageSettings } from "@/common/functions"
import { useProviderSettings } from "../ProviderSettings"
import Images from "@/components/Images"
import { usePermissions } from "../PermissonLayout"
import { CheckRolePermissionFuc } from "@/common/fuctionPermission"

const SlideBar = () => {
  const [MenuItemSlide, setMenuItemSlide] = useState(getPrivateRouter)
  const location = useLocation()
  const { dataSettings } = useProviderSettings()
  const [settingsImg, setSettingsImg] = useState({})
  const { nameRole, permissionArr } = usePermissions()

  useEffect(() => {
    if (dataSettings?.logo) {
      const settingsStyle = setStyleImageSettings({
        logo: dataSettings?.logo
      })
      setSettingsImg(settingsStyle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSettings?.logo])

  useEffect(() => {
    setMenuItemSlide((prev) => {
      const newPrev = [...prev.childrenRouter]
      const arrPath = location?.pathname?.substring(1)?.split("/")
      const newDataMenu = newPrev.map((menu) => {
        if (menu?.path === `/${arrPath?.[0]}`) {
          return { ...menu, isShowAll: true }
        }
        return { ...menu, isShowAll: false }
      })
      return {
        privateRole: prev.privateRole,
        childrenRouter: newDataMenu
      }
    })
  }, [location?.pathname])

  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo mb-4 pt-5 flex justify-center items-center">
        <NavLink to={config.router.home} className="app-brand-link">
          <span className="app-brand-logo demo w-full">
            <Images src={dataSettings?.logo?.src} h={45} w={134} innerPropsImages={{ style: { ...settingsImg } }} />
          </span>
        </NavLink>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1 overflow-y-auto overflow-x-hidden">
        {MenuItemSlide?.childrenRouter?.map((item, index) => {
          const isRender = CheckRolePermissionFuc(permissionArr, item, nameRole)
          return (
            <Fragment key={index}>
              {isRender && !item?.isHeader && (
                <MenuItem
                  item={item}
                  index={index}
                  setMenuItemSlide={setMenuItemSlide}
                  titleDefault={MenuItemSlide?.privateRole?.title}
                />
              )}

              {item?.isHeader && isRender && (
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">{item?.title}</span>
                </li>
              )}
            </Fragment>
          )
        })}
      </ul>
    </aside>
  )
}

export default SlideBar
