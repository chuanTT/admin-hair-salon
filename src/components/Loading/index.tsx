import { FC } from "react"
import "./Loading.css"

interface LoadingProps {
  isCenterScreen?: boolean
  classNameDiv?: string
  isIndex?: boolean
}

const Loading: FC<LoadingProps> = ({ isCenterScreen, classNameDiv, isIndex = false }) => {
  return (
    <div
      className={`${isCenterScreen ? "flex justify-center items-center [&>*]:scale-50 fixed inset-0" : ""} ${
        classNameDiv ?? ""
      } ${isIndex ? "z-[1081]" : ""}`}
    >
      <div className="spinner"></div>
    </div>
  )
}

export default Loading
