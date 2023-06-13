import Images from "@/components/Images"
import "../NotFound/NotFound.css"
import images from "@/assets/img"
import Button from "@/components/Button"
import config from "@/config"
import ButtonLoading from "@/components/ButtonLoading"

/* eslint-disable react/no-unescaped-entities */
const NoPermission = () => {
  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Bạn không có quyền truy cập!</h2>
        <p className="mb-4 mx-2">Vui lòng liên hệ quản trị viên để xử lý</p>
        <ButtonLoading to={config.router.home} isPrimary>
          Đi đến trang chủ
        </ButtonLoading>
        <div className="mt-4">
          <Images
            src={images.girlDoingYogaLight}
            alt="girl-doing-yoga-light"
            w={500}
            h={"auto"}
            classNameImg="img-fluid"
          />
        </div>
      </div>
    </div>
  )
}

export default NoPermission
