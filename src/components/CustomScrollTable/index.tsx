import images from "@/assets/img"
import { MutableRefObject, useEffect, useRef } from "react"
import Loading from "../Loading"
// import Table from "./Table";

const CustomScrollTable = ({
  children,
  isNoResult = true,
  isFetched = false,
  isTransparent = false
}: {
  children: (refTable: MutableRefObject<HTMLTableElement | null>) => JSX.Element
  isNoResult: boolean
  isFetched: boolean
  isTransparent?: boolean
}) => {
  const scrollContainer = useRef<HTMLDivElement | null>(null)
  const scrollThumb = useRef<HTMLDivElement | null>(null)
  const TableContainer = useRef<HTMLTableElement | null>(null)
  const scrollBg = useRef<HTMLDivElement | null>(null)
  const scrolling = useRef(false)

  useEffect(() => {
    function init() {
      if (scrollContainer.current && scrollBg.current && TableContainer.current && scrollThumb.current) {
        const heightWindow = window.innerHeight
        const { top } = scrollContainer.current.getBoundingClientRect()
        const { height: heightThumb } = scrollBg.current.getBoundingClientRect()
        const { width: wTable, top: topTable, height: heightTable } = TableContainer.current.getBoundingClientRect()
        const thead = TableContainer.current.querySelector("thead")
        let hThead = 0
        if (thead) {
          hThead = thead?.clientHeight
        }
        scrollThumb.current.style.width = `${wTable}px`

        const topElement = heightWindow - top - heightThumb
        const maxScroll = top + heightTable - heightThumb

        if (!(heightWindow > topTable + hThead) || maxScroll < heightWindow) {
          scrollBg.current.style.display = `none`
        } else {
          scrollBg.current.style.display = `block`
        }

        scrollBg.current.style.top = `${topElement}px`
        scrollBg.current.scrollLeft = scrollContainer.current.scrollLeft
      }
    }

    scrollBg.current &&
      (scrollBg.current.onscroll = (e) => {
        if (scrolling.current) {
          scrolling.current = false
          return true
        }
        scrolling.current = true

        if (scrollContainer.current) {
          const element = e.target as HTMLDivElement
          scrollContainer.current && (scrollContainer.current.scrollLeft = element.scrollLeft)
        }
      })

    scrollContainer.current &&
      (scrollContainer.current.onscroll = (e) => {
        if (scrolling.current) {
          scrolling.current = false
          return true
        }
        scrolling.current = true
        if (scrollBg.current) {
          const element = e.target as HTMLDivElement
          scrollBg.current.scrollLeft = element.scrollLeft
        }
      })

    window.addEventListener("scroll", init)
    window.addEventListener("resize", init)
    window.addEventListener("click", init)

    return () => {
      window.removeEventListener("scroll", init)
      window.removeEventListener("resize", init)
      window.removeEventListener("click", init)
    }
  }, [])

  return (
    <>
      <div className={`${isTransparent ? "" : "bg-white shadow-lg"} rounded-sm relative`}>
        <div className="absolute left-0 w-full h-5 overflow-x-auto overflow-y-hidden z-[5]" ref={scrollBg}>
          <div className="h-5" ref={scrollThumb}></div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden" ref={scrollContainer}>
          {children(TableContainer)}
        </div>

        {!isFetched && <Loading classNameDiv="flex justify-center [&>*]:scale-50 items-start py-4" />}

        {isFetched && isNoResult && (
          <div className="[&>img]:w-16 flex flex-col items-center pb-7">
            <img src={images.NoResult} alt="không có kết quả" />

            <span className="block mt-3">Không tìm thấy dữ liệu</span>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomScrollTable
