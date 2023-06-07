import ButtonLoading from "@/components/ButtonLoading"
import { FilterTrashProps, defaultProps } from "@/types"
import { Dispatch, FC, SetStateAction } from "react"

interface LayoutDefaultFilterProps extends defaultProps, FilterTrashProps {
    isButton?: boolean
    to?: string
    txtButton?: string
    is_show?: boolean
    is_restore?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setIsOpen?: Dispatch<SetStateAction<boolean>>

}

const LayoutDefaultFilter: FC<LayoutDefaultFilterProps> = ({ children, isButton, to, txtButton, is_show, setIsOpen, setIsRestore, is_restore }) => {
    return (
        <div className={`mb-4 flex justify-between flex-wrap gap-3 ${isButton ? "max-sm:flex-col" : ""}`}>
            <div className="flex items-center gap-3 [&>*]:w-72 flex-wrap max-sm:[&>*]:w-full [&>*]:h-10 max-sm:w-full">{children}</div>
            <div className="flex items-center gap-3 [&>*]:h-10">
                {isButton && <ButtonLoading classCustom="w-fit" to={to} isPrimary>
                    {txtButton}
                </ButtonLoading>}

                {is_show && <ButtonLoading classCustom="w-fit hover:bg-red-500 bg-red-600 text-white" onClick={() => {
                    setIsOpen && setIsOpen(true)
                    setIsRestore && setIsRestore(false)
                }}>Xoá lựa chọn</ButtonLoading>}

                {is_show && is_restore && <ButtonLoading classCustom="w-fit hover:bg-blue-500 bg-blue-600 text-white" onClick={() => {
                    setIsOpen && setIsOpen(true)
                    setIsRestore && setIsRestore(true)
                }}>Khôi phục</ButtonLoading>}
            </div>

        </div>
    )
}

export default LayoutDefaultFilter
