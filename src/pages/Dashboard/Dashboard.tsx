import { getOtherCount } from "@/api/otherApi"
import images from "@/assets/img"
import CardCouter from "@/components/CardCouter"
import CardDefault from "@/components/CardDefault"
import ChartDashboard from "@/components/ChartDashboard"
import useFetchingApi from "@/hooks/useFetchingApi"
import { useProtectedLayout } from "@/layout/ProtectedLayout"

const Dashboard = () => {
  const { user } = useProtectedLayout()
  const { data } = useFetchingApi({
    nameTable: "count",
    CallAPi: getOtherCount
  })
  return (
    <>
      <div className="row">
        <div className="col-lg-8 mb-4 order-0">
          <CardDefault full_name={user?.full_name} />
        </div>

        <div className="col-lg-4 col-md-4 order-1">
          <div className="row h-full max-sm:[&>*]:!w-full">
            <CardCouter
              src={images.ChartSuccess}
              title="Sản phẩm"
              counter={data?.data?.countProduct || 0}
              desc="Số lượng sản phẩm trong ngày"
            />
            <CardCouter
              src={images.walletInfo}
              title="Bài viết"
              counter={data?.data?.countBlog || 0}
              desc="Số lượng bài viết trong ngày"
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-12 order-1 mb-4 max-lg:!flex-1">
          <ChartDashboard title="Số lượng sản phẩm trong tháng" />
        </div>
      </div>
    </>
  )
}

export default Dashboard
