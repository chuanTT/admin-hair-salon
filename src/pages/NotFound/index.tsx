import images from "@/assets/img"
import "./NotFound.css"
import config from "@/config"
import ButtonLoading from "@/components/ButtonLoading"
import Images from "@/components/Images"

const NotFound = () => {
  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Không Tìm Thấy Trang :(</h2>
        <p className="mb-4 mx-2">Oops! 😖 Không tìm thấy URL được yêu cầu trên máy chủ này.</p>
        <ButtonLoading to={config.router.home} isPrimary>
          Đi đến trang chủ
        </ButtonLoading>

        <div className="mt-3">
          <Images
            src={images.pageMiscErrorLight}
            alt="page-misc-error-light"
            w={500}
            h={"auto"}
            classNameImg="img-fluid"
          />
        </div>
      </div>
    </div>
  )
}

export default NotFound
