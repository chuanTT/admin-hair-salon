import { FC } from "react"
import "./Loading.css"

interface LoadingProps {
  isCenterScreen?: boolean
  classNameDiv?: string
}

const Loading: FC<LoadingProps> = ({ isCenterScreen, classNameDiv }) => {
  return (
    // <div className="loadingio-spinner-ripple-yn0xteit8tq">
    //   <div className="ldio-fz324hr5et9">
    //     <div></div>
    //     <div></div>
    //   </div>
    // </div>

    <div
      className={`${isCenterScreen ? "flex justify-center items-center [&>*]:scale-50 fixed inset-0" : ""} ${
        classNameDiv ?? ""
      }`}
    >
      <div className="spinner"></div>
    </div>
  )
}

export default Loading
