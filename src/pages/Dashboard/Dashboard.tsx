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
          <div className="row h-full">
            <CardCouter src={images.ChartSuccess} title="Sản phẩm" counter={data?.data?.countProduct || 0} desc="Số lượng sản phẩm trong ngày" />
            <CardCouter src={images.walletInfo} title="Bài viết" counter={data?.data?.countBlog || 0} desc="Số lượng bài viết trong ngày" />
          </div>
        </div>

        <div className="col-md-6 col-lg-12 order-1 mb-4">
          <div className="card h-100">
            <h5 className="card-header m-0 me-2 pb-3">Số lượng sản phẩm trong tháng</h5>
            <div className="card-body px-0">
              <div className="tab-content flex !p-0">
                <div className="tab-pane fade show active grow" id="navs-tabs-line-card-income" role="tabpanel">
                  <ChartDashboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
