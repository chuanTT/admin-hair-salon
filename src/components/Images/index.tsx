import { FC, ImgHTMLAttributes, SyntheticEvent, useState } from "react"
import images from "@/assets/img"
// import { Delivery } from "../../assets/images";

interface ImagesProps {
  w?: number | string
  h?: number | string
  src?: string
  defaultSrc?: string
  isRounded?: boolean
  alt?: string
  className?: string
  classNameImg?: string
  innerPropsImages?: ImgHTMLAttributes<HTMLImageElement>
  zIndex?: number
}

const Images: FC<ImagesProps> = ({
  w = 50,
  h = 50,
  src = "",
  defaultSrc = images.defaultAvatar,
  isRounded = false,
  alt = "",
  className = "",
  classNameImg = "",
  innerPropsImages = {},
  zIndex = 0
}) => {
  const [isPeding, setIsPending] = useState(true)

  return (
    <div
      className={`overflow-hidden relative ${isRounded ? "rounded-full" : ""} ${className}`}
      style={{ width: w, height: h, zIndex: zIndex }}
    >
      <img
        {...innerPropsImages}
        className={`w-full h-full object-cover relative z-[1] ${classNameImg}`}
        src={src || defaultSrc}
        loading="eager"
        decoding="async"
        onLoad={() => {
          setIsPending(false)
        }}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget && e?.currentTarget?.setAttribute("src", defaultSrc)
        }}
        alt={alt}
      />

      {isPeding && (
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              animationDuration: "2s",
              animationFillMode: "forwards",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              animationName: "placeHolderShimmer",
              background: "linear-gradient(to right, #eeeeee 8%, #bbbbbb 18%, #eeeeee 33%)",
              backgroundSize: "800px 104px"
            }}
          ></div>
        </div>
      )}
    </div>
  )
}

export default Images
