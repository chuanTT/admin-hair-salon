import { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { RiMenu2Fill } from "react-icons/ri"
import { BiUser } from "react-icons/bi"
import { HiPower } from "react-icons/hi2"
import "./header.css"
import Images from "@/components/Images"
import { useProtectedLayout } from "../ProtectedLayout"

const Header = () => {
  const { data } = useProtectedLayout()

  useEffect(() => {
    const initPadding = () => {
      const Header = document.getElementById("layout-navbar")
      const content = document.querySelector(".container") as HTMLDivElement
      const y = window.scrollY
      const wWindown = window.innerWidth

      if (Header && content) {
        const { height: heaightHeader } = Header.getBoundingClientRect()
        const maxHeight = heaightHeader + 12
        if (wWindown >= 1200) {
          let topH = "12px"
          if (maxHeight <= y) {
            topH = "0px"
          }
          Header.style.top = topH
        }

        content.style.marginTop = `${maxHeight}px`
      }
    }

    initPadding()

    window.addEventListener("scroll", initPadding)

    return () => {
      window.removeEventListener("scroll", initPadding)
    }
  }, [])

  return (
    <nav
      className="layout-navbar max-1200:!top-0 max-1200:!w-full 1200:!content !fixed 1200:right-[26px] transition-all duration-150 container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme flex items-center"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <div className="nav-item nav-link px-0 me-xl-4 text-xl">
          <RiMenu2Fill />
        </div>
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <div className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
              <div className="avatar avatar-online">
                <Images src={data?.avatar} w={"100%"} h={"100%"} alt="avatar" classNameImg="w-px-40 h-auto" isRounded />
              </div>
            </div>
            <ul className="dropdown-menu right-0">
              <li>
                <NavLink className="dropdown-item" to="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <Images
                          src={data?.avatar}
                          w={"100%"}
                          h={"100%"}
                          alt="avatar"
                          classNameImg="w-px-40 h-auto"
                          isRounded
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">{data?.full_name || "Mặc định"}</span>
                      <small className="text-muted">{data?.role?.name}</small>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <Link className="dropdown-item !flex items-center" to="#">
                  <div className="mr-2 text-lg">
                    <BiUser />
                  </div>
                  <span className="align-middle">Thông tin cá nhân</span>
                </Link>
              </li>
              <li>
                <a className="dropdown-item !flex items-center" href="auth-login-basic.html">
                  <div className="mr-2 text-lg">
                    <HiPower />
                  </div>
                  <span className="align-middle">Đăng xuất</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Header
