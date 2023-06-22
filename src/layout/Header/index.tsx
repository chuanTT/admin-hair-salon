import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { RiMenu2Fill } from "react-icons/ri"
import { BiUser } from "react-icons/bi"
import { HiPower } from "react-icons/hi2"
import Images from "@/components/Images"
import { useProtectedLayout } from "../ProtectedLayout"
import { layoutMenuFucRemove } from "../DefaultLayout"
import "./header.css"
import Modal from "@/components/Modal"
import ButtonLoading from "@/components/ButtonLoading"
import config from "@/config"

const Header = () => {
  const { user, removeAuth } = useProtectedLayout()
  const [isOpen, setIsOpen] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const initPadding = () => {
      const Header = document.getElementById("layout-navbar")
      const content = document.querySelector(".container-content") as HTMLDivElement
      const layoutMenu = document.querySelector(".layout-menu")
      const y = window.scrollY
      const wWindown = window.innerWidth

      if (Header && content && layoutMenu) {
        const { height: heaightHeader } = Header.getBoundingClientRect()
        const { width, left } = content.getBoundingClientRect()

        const maxHeight = heaightHeader + 12
        if (wWindown >= 1200) {
          let topH = "12px"
          if (maxHeight <= y) {
            topH = "0px"
          }
          const styleContent = getComputedStyle(content)
          const paddingRight = parseFloat(styleContent.paddingRight)
          const paddingLeft = parseFloat(styleContent.paddingLeft)
          Header.style.top = topH
          Header.style.width = `${width - paddingRight - paddingLeft}px`
          Header.style.left = `${left + paddingLeft}px`
        } else {
          Header.style.width = `100%`
          Header.style.left = `0px`
        }

        content.style.marginTop = `${maxHeight}px`
      }
    }

    initPadding()

    window.addEventListener("scroll", initPadding)
    window.addEventListener("resize", initPadding)

    return () => {
      window.removeEventListener("scroll", initPadding)
      window.removeEventListener("resize", initPadding)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav
      className="layout-navbar !mx-0 max-1200:!top-0 !max-w-none !fixed transition-all duration-150 navbar navbar-expand-xl navbar-detached bg-navbar-theme flex items-center"
      id="layout-navbar"
    >
      <div
        className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
        onClick={() => {
          const html = document.querySelector("html")
          html?.classList?.add("layout-menu-expanded", "layout-transitioning")
          layoutMenuFucRemove(html)
        }}
        aria-hidden="true"
      >
        <div className="nav-item nav-link px-0 me-xl-4 text-xl">
          <RiMenu2Fill />
        </div>
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <div className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
              <div className="avatar avatar-online select-none" onClick={() => setIsOpen(!isOpen)} aria-hidden="true">
                <Images src={user?.avatar} w={"100%"} h={"100%"} alt="avatar" classNameImg="w-px-40 h-auto" isRounded />
              </div>
            </div>
            <ul
              className={`dropdown-menu right-0 z-10 !block transition-all duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible translate-y-5"
              }`}
            >
              <li>
                <NavLink className="dropdown-item" to="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <Images
                          src={user?.avatar}
                          w={"100%"}
                          h={"100%"}
                          alt="avatar"
                          classNameImg="w-px-40 h-auto"
                          isRounded
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">{user?.full_name || "Mặc định"}</span>
                      <small className="text-muted">{user?.role?.name}</small>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="dropdown-item !flex items-center"
                  to={config.router.me}
                >
                  <div className="mr-2 text-lg">
                    <BiUser />
                  </div>
                  <span className="align-middle">Thông tin cá nhân</span>
                </Link>
              </li>
              <li className="cursor-pointer">
                <span
                  className="dropdown-item !flex items-center"
                  onClick={() => {
                    setIsOpen(false)
                    setIsShow(true)
                  }}
                  aria-hidden="true"
                >
                  <div className="mr-2 text-lg">
                    <HiPower />
                  </div>
                  <span className="align-middle">Đăng xuất</span>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <Modal isOpen={isShow} setIsOpen={setIsShow} classModalWidth="max-sm:w-[90%]">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div
              className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 text-xl sm:mx-0 sm:h-10 sm:w-10`}
            >
              <HiPower />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Thông báo</h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">Bạn có chắc chắn muốn đăng xuất không?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex max-sm:justify-center flex-row-reverse gap-2">
          <span className="flex rounded-md shadow-sm sm:w-fit">
            <ButtonLoading
              classCustom="bg-red-600 hover:bg-red-500 text-white"
              onClick={() => {
                !isPending && setIsShow(false)
              }}
            >
              Huỷ
            </ButtonLoading>
          </span>
          <span className="flex rounded-md shadow-sm sm:mt-0 sm:w-fit ">
            <ButtonLoading
              isPending={isPending}
              isPrimary
              onClick={() => {
                setIsPending(true)
                typeof removeAuth === "function" && removeAuth()
              }}
            >
              Đồng ý
            </ButtonLoading>
          </span>
        </div>
      </Modal>
    </nav>
  )
}
export default Header
