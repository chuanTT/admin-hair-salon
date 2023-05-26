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
      </div>
    </>
  )
}

export default Dashboard
