import images from "@/assets/img"
import "./NotFound.css"
import Button from "@/components/Button"
import config from "@/config"

const NotFound = () => {
  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Không Tìm Thấy Trang :(</h2>
        <p className="mb-4 mx-2">Oops! 😖 Không tìm thấy URL được yêu cầu trên máy chủ này.</p>
        <Button
          to={config.router.home}
          customClass="font-bold py-2 px-4 border !rounded bg-blue-600 hover:bg-blue-500 text-white max-sm:min-w-[88px]"
          aria-hidden="true"
        >
          Đi đến trang chủ
        </Button>

        <div className="mt-3">
          <img src={images.pageMiscErrorLight} alt="page-misc-error-light" width="500" className="img-fluid" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
