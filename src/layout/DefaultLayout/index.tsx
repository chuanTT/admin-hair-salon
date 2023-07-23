import { ReactNode } from "react"
import Header from "../Header"
import SlideBar from "../SlideBar"
import PermissonLayout from "../PermissonLayout"

export const layoutMenuFucRemove = (html?: HTMLElement | null) => {
  if (html) {
    const layoutMenu = document?.getElementById("layout-menu")
    if (layoutMenu) {
      layoutMenu.ontransitionend = () => {
        if (html?.classList?.contains("layout-transitioning")) {
          html?.classList?.remove("layout-transitioning")
        }
        layoutMenu.ontransitionend = null
      }
    }
  }
}

export const CloseMenu = () => {
  const html = document.querySelector("html")
  if (html?.classList?.contains("layout-menu-expanded")) {
    html?.classList?.remove("layout-menu-expanded")
  }
  if (!html?.classList?.contains("layout-transitioning")) {
    html?.classList?.add("layout-transitioning")
    layoutMenuFucRemove(html)
  }
}

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PermissonLayout>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SlideBar />

          <div className="layout-page">
            <div className="content-wrapper">
              <Header />
              <div className="container-content container-xxl flex-grow-1 container-p-y">{children}</div>
            </div>
          </div>
        </div>

        <div
          className="layout-overlay layout-menu-toggle"
          onClick={() => {
            CloseMenu()
          }}
          aria-hidden="true"
        ></div>
      </div>
    </PermissonLayout>
  )
}

export default DefaultLayout
