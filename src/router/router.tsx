import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom"
import config from "@/config"
import Dashboard from "@/pages/Dashboard"
import DefaultLayout from "@/layout/DefaultLayout"
import Product from "@/pages/Products"
import Users from "@/pages/Users"
import Blog from "@/pages/Blog"
import AddUser from "@/pages/Users/AddUser"
import EditUser from "@/pages/Users/EditUser"
import Login from "@/pages/Login"
import Permission from "@/pages/Settings/Permission"
import NotFound from "@/pages/NotFound"

const router: RouteObject[] = [
  {
    path: config.router.home,
    element: (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },

      {
        path: config.router.product,
        element: <Product />
      },

      {
        path: config.router.user,
        children: [
          {
            index: true,
            element: <Users />
          },
          {
            path: config.router.addUser,
            element: <AddUser />
          },
          {
            path: config.router.editUser,
            element: <EditUser />
          }
        ]
      },

      {
        path: config.router.blog,
        element: <Blog />
      },

      {
        path: config.router.settings,
        children: [
          {
            path: config.router.permission,
            element: <Permission />
          }
        ]
      }
    ]
  },

  {
    path: config.router.login,
    element: <Login />
  }
]

export default createBrowserRouter(router)
