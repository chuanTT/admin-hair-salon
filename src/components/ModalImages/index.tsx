import { Dispatch, FC, SetStateAction } from "react"
import Modal from "../Modal"
import ToastCustom, { TypeToast } from "../ToastCustom"
import CustomSlider from "./CustomSilder"
import "./ModelSilder.css"
import Images from "../Images"
import Portal from "../Portal"

interface ModelSilderProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  listImages?: string[] | []
}

const ModelSlider: FC<ModelSilderProps> = ({ isOpen, setIsOpen, listImages }) => {
  return (
    <>
      {(!listImages || listImages?.length === 0) && (
        <ToastCustom
          isOpenToast={isOpen}
          title="Không tìm thấy hình ảnh nào..."
          type={TypeToast.WARN}
          CloseEvent={() => {
            setIsOpen(false)
          }}
        />
      )}

      {listImages && listImages.length > 0 && (
        <Portal>
          <Modal classModalWidth={"w-[90%] max-h-[95%]"} isOpen={isOpen} setIsOpen={setIsOpen}>
            <CustomSlider
              settings={{
                arrows: false,
                dots: true,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {}
                  }
                ]
              }}
            >
              {listImages?.map((item, index) => {
                return <Images w={"100%"} h={"100%"} key={index} src={item} className="min-h-[150px]" />
              })}
            </CustomSlider>
          </Modal>
        </Portal>
      )}
    </>
  )
}

export default ModelSlider
