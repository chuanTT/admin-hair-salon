/* eslint-disable react/display-name */
import { createBrowserRouter, defer, IndexRouteObject, NonIndexRouteObject } from "react-router-dom"
import { lazy, Suspense } from "react"
import config from "@/config"
import Dashboard from "@/pages/Dashboard"
import Product from "@/pages/Products"
import Users from "@/pages/Users"
import UserListTrash from "@/pages/Users/UserListTrash"
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
import Loading from "@/components/Loading"
import ProductListTrash from "@/pages/Products/ProductListTrash"
import BlogListTrash from "@/pages/Blog/BlogListTrash"
import SlideshowProducts from "@/pages/Products/SlideshowProducts"
import EditProducts from "@/pages/Products/EditProducts"
import AddBlog from "@/pages/Blog/AddBlog"
import EditBlog from "@/pages/Blog/EditBlog"
import AddProductsSilder from "@/pages/Products/AddProductsSilder"
import EditProductsSlider from "@/pages/Products/EditProductsSlider"
import GeneralSettings from "@/pages/Settings/GeneralSettings"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const Loadable = (str: string) => () => {
  const Component = lazy(() => import(str))
  return (
    <Suspense fallback={<Loading isCenterScreen />}>
      <Component />
    </Suspense>
  )
}

// const Users = Loadable("../pages/Users")

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
    loader: () => defer({ userPromise: verifyToken() }),
    element: <AuthLayout />,
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
            path: config.router.userTrash,
            title: "Danh sách nhân viên đã xóa",
            element: <UserListTrash />
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
          },

          {
            path: config.router.editProduct,
            title: "Chỉnh sửa sản phẩm",
            element: <EditProducts />,
            isNoRender: true
          },

          {
            path: config.router.userTrash,
            title: "Danh sách sản phẩm đã xóa",
            element: <ProductListTrash />
          },
        

          {
            path: config.router.slideshowProduct,
            title: "Trình chiếu sản phẩm",
            element: <SlideshowProducts />
          },

          {
            path: config.router.addSlideshowProduct,
            title: "Thêm trình chiếu",
            element: <AddProductsSilder />,
            isNoRender: true
          },

          {
            path: config.router.editSlideshowProduct,
            title: "Chỉnh sửa trình chiếu",
            element: <EditProductsSlider />,
            isNoRender: true
          },
        ]
      },

      {
        path: config.router.blog,
        title: "Bài viết",
        icon: GiOpenBook,
        children: [
          {
            index: true,
            title: "Danh sách bài viết",
            element: <Blog />
          },

          {
            path: config.router.userTrash,
            title: "Danh sách bài viết đã xóa",
            element: <BlogListTrash />
          },

          {
            path: config.router.addBlog,
            title: "Thêm bài viết",
            element: <AddBlog />
          },

          {
            path: config.router.editBlog,
            title: "Chỉnh sửa bài viết",
            element: <EditBlog />,
            isNoRender: true
          }
        ]
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
          },

          {
            path: config.router.generalSettings,
            title: "Cài đặt chung",
            element: <GeneralSettings />
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
