import { FC, useEffect, useRef, useState } from "react"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import { childrenFormHandel } from "@/components/FormHandel"
import Loading from "@/components/Loading"
import LayoutFormDefault from "@/layout/LayoutFormDefault"

interface UpdateIconSettingProps extends childrenFormHandel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: string
  isFetchedSettings?: boolean
}

const UpdateIconSetting: FC<UpdateIconSettingProps> = ({
  propForm,
  isPending,
  setResertForm,
  icon,
  isFetchedSettings
}) => {
  const { setValue, register, clearErrors } = propForm
  const ImgRef = useRef<refListImage>(null)
  const [, setUpdated] = useState(false)

  useEffect(() => {
    if (icon) {
      ImgRef.current && ImgRef.current?.setSrc?.(icon)
      setUpdated((prev) => !prev)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icon])

  return (
    <div>
      <h2 className="text-lg">Thay đổi Icon</h2>

      {!isFetchedSettings && <Loading classNameDiv="flex justify-center [&>*]:scale-50 items-start py-4" />}
      {isFetchedSettings && (
        <LayoutFormDefault
          isPending={isPending}
          txtButtonPrimary="Chỉnh sửa"
          clickButtonCancel={() => {
            clearErrors()
            typeof setResertForm === "function" && setResertForm((prev) => !prev)
          }}
        >
          <ListImagesUploadFile
            title="Hình ảnh"
            classParentImg="mb-3"
            ref={ImgRef}
            setValue={setValue}
            name="icon"
            register={register}
          />
        </LayoutFormDefault>
      )}
    </div>
  )
}

export default UpdateIconSetting
