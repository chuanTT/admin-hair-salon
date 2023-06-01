import ButtonLoading from "@/components/ButtonLoading"
import { defaultProps } from "@/types"
import { FC } from "react"

interface LayoutDefaultFilterProps extends defaultProps {
  isButton?: boolean
  to?: string
  txtButton?: string
}

const LayoutDefaultFilter: FC<LayoutDefaultFilterProps> = ({ children, isButton, to, txtButton }) => {
  return (
    <div className={`mb-4 flex justify-between flex-wrap gap-4 ${isButton ? "max-sm:flex-col" : ""}`}>
      <div className="flex items-center gap-3 [&>*]:w-72 flex-wrap max-sm:[&>*]:w-full [&>*]:h-10 max-sm:w-full">{children}</div>
      {isButton && (
        <div>
          <ButtonLoading classCustom="w-fit" to={to} isPrimary>
            {txtButton}
          </ButtonLoading>
        </div>
      )}
    </div>
  )
}

export default LayoutDefaultFilter
