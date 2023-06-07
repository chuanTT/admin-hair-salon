import images from "@/assets/img"
import CardCouter from "@/components/CardCouter"
import CardDefault from "@/components/CardDefault"
import { useProtectedLayout } from "@/layout/ProtectedLayout"

const Dashboard = () => {
  const { user } = useProtectedLayout()
  return (
    <>
      <div className="row">
        <div className="col-lg-8 mb-4 order-0">
          <CardDefault full_name={user?.full_name} />
        </div>

        <div className="col-lg-4 col-md-4 order-1">
          <div className="row h-full">
            <CardCouter src={images.ChartSuccess} title="Sản phẩm" counter="20" desc="Số lượng sản phẩm trong ngày" />
            <CardCouter src={images.walletInfo} title="Bài viết" counter="10" desc="Số lượng bài viết trong ngày" />
          </div>
        </div>

        <div className="col-md-6 col-lg-12 order-1 mb-4">
          <div className="card h-100">
            <h5 className="card-header m-0 me-2 pb-3">Số lượng sản phẩm</h5>
            <div className="card-body px-0">
              <div className="tab-content p-0">
                <div className="tab-pane fade show active" id="navs-tabs-line-card-income" role="tabpanel">
                  <div id="incomeChart"></div>
                  <div className="d-flex justify-content-center pt-4 gap-2">
                    <div className="flex-shrink-0">
                      <div id="expensesOfWeek"></div>
                    </div>
                    <div>
                      <p className="mb-n1 mt-1">Expenses This Week</p>
                      <small className="text-muted">$39 less than last week</small>
                    </div>
                  </div>
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
