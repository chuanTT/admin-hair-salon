/* eslint-disable react/display-name */
import { createBrowserRouter, defer, IndexRouteObject, Navigate, NonIndexRouteObject, Outlet } from "react-router-dom"
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
import ProviderSettings from "@/layout/ProviderSettings"
import { Event, PermissionInterFace, RoleList } from "@/types"
import NoPermission from "@/pages/NoPermission"

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
  key?: string | string[]
  role?: string | string[]
  isEvent?: boolean
}

type CustomIndexRouteObject = IndexRouteObject & CustomRouteObjectParams

type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
  CustomRouteObjectParams & {
    children?: (CustomIndexRouteObject | CustomNonIndexRouteObject)[]
  }

export type CustomRouteConfig = CustomIndexRouteObject | CustomNonIndexRouteObject

export const router: CustomRouteConfig[] = [
  {
    element: (
      <ProviderSettings>
        <Outlet />
      </ProviderSettings>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: config.router.home,
        type: typeRouter.private,
        title: "Trang chủ",
        loader: () => defer({ userPromise: verifyToken() }),
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            icon: IoHome
          },

          {
            title: "Quản lý",
            isHeader: true,
            key: [
              PermissionInterFace.PRODUCT,
              PermissionInterFace.USER,
              PermissionInterFace.BLOG,
              PermissionInterFace.ROLE
            ]
          },

          {
            path: config.router.user,
            title: "Nhân viên",
            icon: BsFillPeopleFill,
            key: PermissionInterFace.USER,
            children: [
              {
                index: true,
                title: "Danh sách nhân viên",
                key: [PermissionInterFace.USER, Event.READ],
                isEvent: true,
                element: <Users />
              },

              {
                path: config.router.userTrash,
                title: "Danh sách nhân viên đã xóa",
                role: [RoleList.ROOT, RoleList.ADMIN],
                element: <UserListTrash />
              },
              {
                path: config.router.addUser,
                title: "Thêm nhân viên",
                key: [PermissionInterFace.USER, Event.CREATE],
                isEvent: true,
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
            key: [PermissionInterFace.PRODUCT, PermissionInterFace.SILDE_PRODUCT],
            children: [
              {
                index: true,
                title: "Danh sách sản phẩm",
                key: [PermissionInterFace.PRODUCT, Event.READ],
                isEvent: true,
                element: <Product />
              },

              {
                path: config.router.userTrash,
                title: "Danh sách sản phẩm đã xóa",
                role: [RoleList.ROOT, RoleList.ADMIN],
                element: <ProductListTrash />
              },

              {
                path: config.router.addProduct,
                title: "Thêm sản phẩm",
                key: [PermissionInterFace.PRODUCT, Event.CREATE],
                isEvent: true,
                element: <AddProducts />
              },

              {
                path: config.router.editProduct,
                title: "Chỉnh sửa sản phẩm",
                element: <EditProducts />,
                isNoRender: true
              },

              {
                path: config.router.slideshowProduct,
                title: "Trình chiếu sản phẩm",
                key: [PermissionInterFace.SILDE_PRODUCT, Event.READ],
                isEvent: true,
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
              }
            ]
          },

          {
            path: config.router.blog,
            title: "Bài viết",
            icon: GiOpenBook,
            key: PermissionInterFace.BLOG,
            children: [
              {
                index: true,
                title: "Danh sách bài viết",
                key: [PermissionInterFace.BLOG, Event.READ],
                isEvent: true,
                element: <Blog />
              },

              {
                path: config.router.userTrash,
                title: "Danh sách bài viết đã xóa",
                role: [RoleList.ROOT, RoleList.ADMIN],
                element: <BlogListTrash />
              },

              {
                path: config.router.addBlog,
                title: "Thêm bài viết",
                key: [PermissionInterFace.BLOG, Event.CREATE],
                isEvent: true,
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
            key: [PermissionInterFace.ROLE],
            children: [
              {
                index: true,
                element: <Navigate to={config.router.generalSettings} replace={true} />,
                isNoRender: true
              },
              {
                path: config.router.generalSettings,
                title: "Cài đặt chung",
                role: [RoleList.ROOT, RoleList.ADMIN],
                element: <GeneralSettings />
              },
              {
                path: config.router.permission,
                key: [PermissionInterFace.ROLE, Event.READ],
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
      },

      {
        path: config.router[404],
        type: typeRouter.public,
        element: <NotFound />
      },

      {
        path: config.router[403],
        type: typeRouter.public,
        element: <NoPermission />
      }
    ]
  }
]

export default createBrowserRouter(router)
