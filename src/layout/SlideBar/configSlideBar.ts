import { BsFillPeopleFill } from "react-icons/bs"
import { FaProductHunt } from "react-icons/fa"
import { IoHome, IoSettingsSharp } from "react-icons/io5"
import { GiOpenBook } from "react-icons/gi"

import config from "@/config"
import { configSildeBarList } from "@/types"

const configSildeBar: configSildeBarList[] = [
  {
    title: "Dashboard",
    to: config.router.home,
    icon: IoHome
  },

  {
    title: "Quản lý",
    isHeader: true
  },

  {
    title: "Nhân viên",
    to: config.router.user,
    icon: BsFillPeopleFill,
    children: [
      {
        title: "Danh sách nhân viên"
      },
      {
        title: "Thêm nhân viên",
        to: config.router.addUser
      },
      {
        title: "Chỉnh sửa nhân viên",
        to: config.router.editUser
      }
    ]
  },

  {
    title: "Sản phẩm",
    to: config.router.product,
    icon: FaProductHunt,
    children: [
      {
        title: "Danh sách sản phẩm"
      },
      {
        title: "Thêm sản phẩm",
        to: "add"
      }
    ]
  },

  {
    title: "Bài viết",
    to: config.router.blog,
    icon: GiOpenBook,
    children: [
      {
        title: "Danh sách viết"
      },
      {
        title: "Thêm viết",
        to: "add"
      }
    ]
  },

  {
    title: "Cài đặt hệ thống",
    to: config.router.settings,
    icon: IoSettingsSharp,
    children: [
      {
        to: config.router.permission,
        title: "Phân quyền"
      }
    ]
  }
]

export { configSildeBar }
