import { TableTopUser, getOtherCount, getTopUser } from "@/api/otherApi"
import images from "@/assets/img"
import CardCouter from "@/components/CardCouter"
import CardDefault from "@/components/CardDefault"
import ChartDashboard from "@/components/ChartDashboard"
import Table from "@/components/Table"
import config from "@/config"
import useFetchingApi from "@/hooks/useFetchingApi"
import { useProtectedLayout } from "@/layout/ProtectedLayout"

const Dashboard = () => {
  const { user } = useProtectedLayout()
  const { data } = useFetchingApi({
    nameTable: "count",
    CallAPi: getOtherCount
  })

  const { data: dataTopUser, isFetched } = useFetchingApi({
    nameTable: TableTopUser,
    CallAPi: getTopUser,
    limit: 5,
    customUrl: ({ query, nameTable, limit }) => {
      return query?.for(nameTable)?.limit(limit)?.url()
    }
  })

  return (
    <>
      <div className="row">
        <div className="col-lg-8 mb-[26px] order-0">
          <CardDefault full_name={user?.full_name} />
        </div>

        <div className="col-lg-4 col-md-12 col-6 mb-[26px]">
          <div className="card h-full">
            <h5 className="card-header m-0 pb-3">Top nhân viên nổi bật</h5>
            <div>
              <Table
                isTransparent
                provider={{ isFetched }}
                isFuc
                configDetail={config.table.configTopUser}
                data={dataTopUser?.data}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-md-4 order-1">
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

            <CardCouter
              src={images.walletInfo}
              title="Nhân viên"
              counter={data?.data?.countUser || 0}
              desc="Số lượng nhân viên mới trong ngày"
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
