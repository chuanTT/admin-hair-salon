import { ReactNode } from "react"
import Header from "../Header"
import SlideBar from "../SlideBar"
import ProtectedLayout from "../ProtectedLayout"

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedLayout>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SlideBar />

          <div className="layout-page">
            <div className="content-wrapper">
              <Header />
              <div className="container-xxl flex-grow-1 container-p-y">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}

export default DefaultLayout
