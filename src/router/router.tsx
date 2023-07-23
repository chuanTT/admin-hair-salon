/* eslint-disable react/display-name */
import { createBrowserRouter, defer, IndexRouteObject, Navigate, NonIndexRouteObject, Outlet } from "react-router-dom"
import { ComponentType, lazy, LazyExoticComponent, Suspense } from "react"
import config from "@/config"
import { IoHome, IoSettingsSharp } from "react-icons/io5"
import { BsFillBoxFill, BsFillPeopleFill } from "react-icons/bs"
import { FaProductHunt } from "react-icons/fa"
import { GiOpenBook } from "react-icons/gi"
import { verifyToken } from "@/api/authApi"
import AuthLayout from "@/layout/AuthLayout"
import ProviderSettings from "@/layout/ProviderSettings"
import { Event, PermissionInterFace, RoleList } from "@/types"
import Loading from "@/components/Loading"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const Loadable = (Comp: LazyExoticComponent<ComponentType<any>>) => () => {
  return (
    <Suspense fallback={<Loading isCenterScreen isIndex />}>
      <Comp />
    </Suspense>
  )
}

const Users = Loadable(lazy(() => import("@/pages/Users")))
const UserListTrash = Loadable(lazy(() => import("@/pages/Users/UserListTrash")))
const AddUser = Loadable(lazy(() => import("@/pages/Users/AddUser")))
const EditUser = Loadable(lazy(() => import("@/pages/Users/EditUser")))
const Dashboard = Loadable(lazy(() => import("@/pages/Dashboard")))

const Product = Loadable(lazy(() => import("@/pages/Products")))
const AddProducts = Loadable(lazy(() => import("@/pages/Products/AddProducts")))
const EditProducts = Loadable(lazy(() => import("@/pages/Products/EditProducts")))
const AddProductsSilder = Loadable(lazy(() => import("@/pages/Products/AddProductsSilder")))
const EditProductsSlider = Loadable(lazy(() => import("@/pages/Products/EditProductsSlider")))
const SlideshowProducts = Loadable(lazy(() => import("@/pages/Products/SlideshowProducts")))
const ProductListTrash = Loadable(lazy(() => import("@/pages/Products/ProductListTrash")))
const CategoryList = Loadable(lazy(() => import("@/pages/Products/CategoryList")))

const Blog = Loadable(lazy(() => import("@/pages/Blog")))
const AddBlog = Loadable(lazy(() => import("@/pages/Blog/AddBlog")))
const EditBlog = Loadable(lazy(() => import("@/pages/Blog/EditBlog")))
const BlogListTrash = Loadable(lazy(() => import("@/pages/Blog/BlogListTrash")))

const Login = Loadable(lazy(() => import("@/pages/Login")))
const NotFound = Loadable(lazy(() => import("@/pages/NotFound")))
const NoPermission = Loadable(lazy(() => import("@/pages/NoPermission")))
const MyProfile = Loadable(lazy(() => import("@/pages/MyProfile")))
const Permission = Loadable(lazy(() => import("@/pages/Settings/Permission")))
const GeneralSettings = Loadable(lazy(() => import("@/pages/Settings/GeneralSettings")))
const SocialsSettings = Loadable(lazy(() => import("@/pages/Settings/SocialsSettings")))

const SectionList = Loadable(lazy(() => import("@/pages/Section/SectionList")))
const AddSection = Loadable(lazy(() => import("@/pages/Section/AddSection")))
const EditSection = Loadable(lazy(() => import("@/pages/Section/EditSection")))

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
  keyParent?: string
  isShowAll?: boolean
}

export type CustomIndexRouteObject = IndexRouteObject & CustomRouteObjectParams

export type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
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
    errorElement: <Navigate to={config.router[404]} replace={true} />,
    children: [
      {
        path: config.router.home,
        type: typeRouter.private,
        loader: () => defer({ userPromise: verifyToken() }),
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            title: "Trang chủ",
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
                keyParent: PermissionInterFace.PRODUCT,
                isEvent: true,
                element: <Product />
              },

              {
                path: config.router.userTrash,
                title: "Danh sách sản phẩm đã xóa",
                role: [RoleList.ROOT, RoleList.ADMIN],
                keyParent: PermissionInterFace.PRODUCT,
                element: <ProductListTrash />
              },

              {
                path: config.router.addProduct,
                title: "Thêm sản phẩm",
                key: [PermissionInterFace.PRODUCT, Event.CREATE],
                keyParent: PermissionInterFace.PRODUCT,
                isEvent: true,
                element: <AddProducts />
              },

              {
                path: config.router.editProduct,
                title: "Chỉnh sửa sản phẩm",
                keyParent: PermissionInterFace.PRODUCT,
                element: <EditProducts />,
                isNoRender: true
              },

              {
                path: config.router.slideshowProduct,
                title: "Trình chiếu sản phẩm",
                key: [PermissionInterFace.SILDE_PRODUCT, Event.READ],
                keyParent: PermissionInterFace.SILDE_PRODUCT,
                isEvent: true,
                element: <SlideshowProducts />
              },

              {
                path: config.router.addSlideshowProduct,
                title: "Thêm trình chiếu",
                element: <AddProductsSilder />,
                keyParent: PermissionInterFace.SILDE_PRODUCT,
                isNoRender: true
              },

              {
                path: config.router.editSlideshowProduct,
                title: "Chỉnh sửa trình chiếu",
                element: <EditProductsSlider />,
                keyParent: PermissionInterFace.SILDE_PRODUCT,
                isNoRender: true
              },

              {
                path: config.router.category,
                title: "Danh sách danh mục",
                element: <CategoryList />
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
            path: config.router.section,
            title: "Thành phần",
            icon: BsFillBoxFill,
            children: [
              {
                index: true,
                title: "Danh sách thành phần",
                element: <SectionList />
              },

              {
                path: config.router.addSection,
                title: "Thêm thành phần",
                element: <AddSection />
              },

              {
                path: config.router.editSection,
                title: "Chỉnh sửa thành phần",
                element: <EditSection />,
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
                path: config.router.socialsSettings,
                element: <SocialsSettings />,
                title: "Mạng xã hội"
              },
              {
                path: config.router.permission,
                key: [PermissionInterFace.ROLE, Event.READ],
                keyParent: PermissionInterFace.ROLE,
                title: "Phân quyền",
                element: <Permission />
              }
            ]
          },

          {
            path: config.router.me,
            title: "Thông tin cá nhân",
            isNoRender: true,
            element: <MyProfile />
          }
        ]
      },

      {
        path: config.router.login,
        type: typeRouter.public,
        title: "Đăng nhập phần mềm quản lý",
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
