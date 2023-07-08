import { UpdateSectionShow, UpdateSectionShowIndex } from "@/api/sectionApi"
import { NowDate, formatDate, numberMoneyVND } from "@/common/functions"
import Images from "@/components/Images"
import UpdateShowSlider from "@/partials/Products/UpdateShowSlider"
import { configProps } from "@/types"

const configProduct: configProps[][] = [
  [
    {
      key: "name",
      head: "Tên sản phẩm"
    },

    {
      key: "alias",
      head: "Đường dẫn thân thiện"
    },

    {
      key: ["user", "full_name"],
      head: "Người tạo"
    },

    {
      key: "price",
      head: "Giá",
      isCus: true,
      element: ({ current }) => {
        const { isNegotiate, price } = current
        return <span>{isNegotiate === 1 ? "Thoả thuận" : numberMoneyVND(price)}</span>
      }
    },

    {
      key: "created_at",
      head: "Ngày tạo",
      customValue: formatDate
    },

    {
      key: "updated_at",
      head: "Ngày cập nhật",
      customValue: formatDate
    }
  ]
]

const configUsers: configProps[][] = [
  [
    {
      key: "full_name",
      head: "Họ và tên",
      isCus: true,
      element: ({ current }) => {
        return (
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
              <Images isRounded src={current?.avatar} alt={current?.full_name} />
            </div>
            <span className="font-medium">{current?.full_name}</span>
          </div>
        )
      }
    },
    {
      key: "phone",
      head: "Số điện thoại"
    },
    {
      key: "email",
      head: "Email"
    },
    {
      key: ["roles", "name"],
      head: "Vai trò"
    },
    {
      key: "user_name",
      head: "Biệt danh"
    },
    {
      key: "created_at",
      head: "Ngày tạo",
      customValue: formatDate
    }
  ]
]

const configBlog: configProps[][] = [
  [
    {
      key: "title",
      head: "Tên bài viết"
    },

    {
      key: "alias",
      head: "Đường dẫn thân thiện"
    },

    {
      key: ["user", "full_name"],
      head: "Người tạo"
    },

    {
      key: "created_at",
      head: "Ngày tạo",
      customValue: formatDate
    },

    {
      key: "updated_at",
      head: "Ngày cập nhật",
      customValue: formatDate
    }
  ]
]

const configPermission: configProps[][] = [
  [
    {
      key: "name",
      head: "Tên vai trò"
    },

    {
      key: "test",
      head: "Ngày tạo",
      customValue: NowDate
    },

    {
      key: "test",
      head: "Ngày cập nhật",
      customValue: NowDate
    }
  ]
]

const configTopUser: configProps[][] = [
  [
    {
      key: "full_name",
      head: "Họ và tên"
    },

    {
      key: "user_name",
      head: "Bí danh"
    },

    {
      key: "count_blog",
      head: "Số lượng bài viết",
      classBodyCus: "text-center",
      customValue(value) {
        return value?.toString()
      }
    }
  ]
]

const configProductSildeShow: configProps[][] = [
  [
    {
      key: "big_thumb",
      head: "Hình ảnh",
      classCustom: "w-[80px]",
      isCus: true,
      element: ({ data }) => {
        return (
          <div className="flex justify-center items-center">
            <Images w={60} h={60} className="" src={(data as string) ?? ""} alt={"hình ảnh"} />
          </div>
        )
      }
    },

    {
      key: ["user", "full_name"],
      head: "Người tạo",
      isCus: true,
      element: ({ current }) => {
        return (
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
              <Images isRounded src={current?.user?.avatar} alt={current?.user?.full_name} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="font-semibold text-gray-700 text-sm">{current?.user?.full_name}</span>
              <span className="font-medium text-gray-400">{current?.user?.user_name}</span>
            </div>
          </div>
        )
      }
    },
    {
      key: ["product", "name"],
      head: "Tên sản phẩm"
    },
    {
      key: "is_show",
      head: "Trạng thái",
      isCus: true,
      element: UpdateShowSlider
    }
  ]
]

const configCategory: configProps[][] = [
  [
    {
      key: "name",
      head: "Tên danh mục"
    },

    {
      key: "alias",
      head: "Đường dẫn thân thiện"
    },

    {
      key: "created_at",
      head: "Ngày tạo",
      customValue: formatDate
    },

    {
      key: "updated_at",
      head: "Ngày cập nhật",
      customValue: formatDate
    }
  ]
]

const configSocials: configProps[][] = [
  [
    {
      key: "thumb",
      head: "Hình ánh",
      isCus: true,
      classCustom: "w-px",
      element: ({ data, current }) => {
        return <Images className="m-auto" w={32} h={32} src={(data as string) ?? ""} alt={current?.name} />
      }
    },
    {
      key: "name",
      head: "Tiêu đề"
    },

    {
      key: "url",
      head: "Đường dẫn"
    }
  ]
]

const configSection: configProps[][] = [
  [
    {
      key: "thumb",
      head: "Hình ảnh",
      isCus: true,
      classCustom: "w-px",
      element: ({ data, current }) => {
        return <Images className="m-auto" w={80} h={80} src={(data as string) ?? ""} alt={current?.name} />
      }
    },
    {
      key: "title",
      head: "Tiêu đề"
    },

    {
      key: "sub_title",
      head: "Tiêu đề phụ"
    },

    {
      key: "is_show",
      head: "Trạng thái",
      isCus: true,
      classCustom: "text-center",
      element: ({ current }) => {
        return <UpdateShowSlider current={current} callApi={UpdateSectionShow} />
      }
    },

    {
      key: "show_index",
      head: "Hiển thị trang chủ",
      classCustom: "text-center",
      isCus: true,
      element: ({ current }) => {
        return <UpdateShowSlider current={current} callApi={UpdateSectionShowIndex} keyProps="show_index" />
      }
    }
  ]
]

export {
  configProduct,
  configSocials,
  configUsers,
  configBlog,
  configTopUser,
  configPermission,
  configProductSildeShow,
  configCategory,
  configSection
}
