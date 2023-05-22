import { NowDate, formatDate, numberMoneyVND } from "@/common/functions"
import Images from "@/components/Images"
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

export { configProduct, configUsers, configBlog, configPermission }
