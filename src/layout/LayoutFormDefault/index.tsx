import { FC } from "react"
import ButtonLoading from "@/components/ButtonLoading"
import { defaultProps } from "@/types"

interface LayoutFormDefaultProps extends defaultProps {
  isPending?: boolean
  txtButtonPrimary?: string
  clickButtonCancel?: () => void
}

const LayoutFormDefault: FC<LayoutFormDefaultProps> = ({
  children,
  isPending,
  txtButtonPrimary,
  clickButtonCancel
}) => {
  return (
    <>
      <div className="row">{children}</div>
      <div className="flex items-center space-x-2">
        <ButtonLoading isPending={isPending} isPrimary>
          {txtButtonPrimary ?? "Thêm"}
        </ButtonLoading>

        <ButtonLoading
          onClick={(e) => {
            e.preventDefault()
            clickButtonCancel && clickButtonCancel()
          }}
        >
          Hủy
        </ButtonLoading>
      </div>
    </>
  )
}

export default LayoutFormDefault
