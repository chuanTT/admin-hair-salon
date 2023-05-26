import { createBrowserRouter, IndexRouteObject, NonIndexRouteObject, Outlet } from "react-router-dom"
import config from "@/config"
import Dashboard from "@/pages/Dashboard"
import Product from "@/pages/Products"
import Users from "@/pages/Users"
import Blog from "@/pages/Blog"
import AddUser from "@/pages/Users/AddUser"
import EditUser from "@/pages/Users/EditUser"
import Login from "@/pages/Login"
import Permission from "@/pages/Settings/Permission"
import NotFound from "@/pages/NotFound"
import { IoHome, IoSettingsSharp } from "react-icons/io5"
import { BsFillPeopleFill } from "react-icons/bs"
import { FaProductHunt } from "react-icons/fa"
import { GiOpenBook } from "react-icons/gi"
import AddProducts from "@/pages/Products/AddProducts"
import { verifyToken } from "@/api/authApi"
import AuthLayout from "@/layout/AuthLayout"

export enum typeRouter {
  public = "public",
  private = "private"
}

type CustomRouteObjectParams = {
  type?: typeRouter
  title?: string
  isHeader?: boolean
  icon?: () => JSX.Element
  isNoRender?: boolean
}

type CustomIndexRouteObject = IndexRouteObject & CustomRouteObjectParams

type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
  CustomRouteObjectParams & {
    children?: (CustomIndexRouteObject | CustomNonIndexRouteObject)[]
  }

export type CustomRouteConfig = CustomIndexRouteObject | CustomNonIndexRouteObject

export const router: CustomRouteConfig[] = [
  {
    path: config.router.home,
    type: typeRouter.private,
    title: "Trang chủ",
    loader: () => verifyToken(),
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        icon: IoHome
      },

      {
        title: "Quản lý",
        isHeader: true
      },

      {
        path: config.router.user,
        title: "Nhân viên",
        icon: BsFillPeopleFill,
        children: [
          {
            index: true,
            title: "Danh sách nhân viên",
            element: <Users />
          },
          {
            path: config.router.addUser,
            title: "Thêm nhân viên",
            element: <AddUser />
          },
          {
            path: config.router.editUser,
            title: "Chỉnh sửa nhân viên",
            isNoRender: true,
            element: <EditUser />
          }
        ]
      },

      {
        path: config.router.product,
        title: "Sản phẩm",
        icon: FaProductHunt,
        children: [
          {
            index: true,
            title: "Danh sách sản phẩm",
            element: <Product />
          },

          {
            path: config.router.addProduct,
            title: "Thêm sản phẩm",
            element: <AddProducts />
          }
        ]
      },

      {
        path: config.router.blog,
        title: "Bài viết",
        icon: GiOpenBook,
        element: <Blog />
      },

      {
        path: config.router.settings,
        title: "Cài đặt",
        icon: IoSettingsSharp,
        children: [
          {
            path: config.router.permission,
            title: "Phân quyền",
            element: <Permission />
          }
        ]
      }
    ]
  },

  {
    path: config.router.login,
    type: typeRouter.public,
    element: <Login />
  }
]

export default createBrowserRouter(router)
