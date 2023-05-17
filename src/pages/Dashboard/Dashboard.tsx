import images from "@/assets/img"

const Dashboard = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8 mb-4 order-0">
          <div className="card">
            <div className="d-flex items-center row">
              <div className="col-sm-7">
                <div className="card-body">
                  <h5 className="card-title text-primary">Xin chào, John! 🎉</h5>
                  <span className="block mb-1 text-base">Thứ 2, ngày 17/05/2023</span>
                  <span className="block mb-3 text-sm">10:00:22 PM</span>
                  <p className="mb-4">Chúc bạn có một ngày làm việc hiệu quả !</p>
                </div>
              </div>
              <div className="col-sm-5 text-center text-sm-left">
                <div className="card-body pb-0 px-0 px-md-4">
                  <img
                    src={images.manWithLaptopLight}
                    height="140"
                    alt="View Badge User"
                  />
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
