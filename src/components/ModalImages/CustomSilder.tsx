import { defaultProps } from "@/types"
import { FC, HTMLAttributes, MouseEvent } from "react"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"

interface CustomArrowProps extends defaultProps {
  classNames?: HTMLAttributes<HTMLButtonElement>["className"]
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  isArrowLeft?: boolean
}

export function CustomArrow({ classNames, children, onClick, isArrowLeft = true }: CustomArrowProps) {
  return (
    <button type="button" className={classNames} onClick={onClick}>
      {isArrowLeft ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={24} height={24}>
          <path
            d="M19.03125 4.28125L8.03125 15.28125L7.34375 16L8.03125 16.71875L19.03125 27.71875L20.46875 26.28125L10.1875 16L20.46875 5.71875Z"
            fill="#5B5B5B"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={24} height={24}>
          <path
            d="M12.96875 4.28125L11.53125 5.71875L21.8125 16L11.53125 26.28125L12.96875 27.71875L23.96875 16.71875L24.65625 16L23.96875 15.28125Z"
            fill="#5B5B5B"
          />
        </svg>
      )}

      {children}
    </button>
  )
}

interface CustomSliderProps extends defaultProps {
  settings: Settings
}

const CustomSlider: FC<CustomSliderProps> = ({ children, settings }) => {
  return <Slider {...settings}>{children}</Slider>
}

export default CustomSlider
