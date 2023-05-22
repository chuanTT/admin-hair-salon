import { ReactNode, useEffect, useRef } from "react"
// import Table from "./Table";

const CustomScrollTable = ({ children }: { children: ReactNode }) => {
  const scrollContainer = useRef<HTMLDivElement | null>(null)
  const scrollThumb = useRef<HTMLDivElement | null>(null)
  const TableContainer = useRef<HTMLTableElement | null>(null)
  const scrollBg = useRef<HTMLDivElement | null>(null)
  const scrolling = useRef(false)

  useEffect(() => {
    const scrollBar = document.getElementById("scrollBar")

    function init() {
      if (scrollContainer.current && scrollBg.current && TableContainer.current && scrollThumb.current && scrollBar) {
        const heightWindow = window.innerHeight
        const { top, height: heightContainer } = scrollContainer.current.getBoundingClientRect()
        const { height: heightThumb } = scrollBg.current.getBoundingClientRect()
        const { width: wTable } = TableContainer.current.getBoundingClientRect()
        scrollThumb.current.style.width = `${wTable}px`

        const marginScrollBar = parseInt(getComputedStyle(scrollBar).marginBottom)

        const topElement = heightWindow - top - marginScrollBar - heightThumb

        const check = heightContainer + marginScrollBar + top

        if (check < heightWindow) {
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

    scrollBar && scrollBar.addEventListener("scroll", init)
    window.addEventListener("resize", init)
    window.addEventListener("click", init)

    return () => {
      scrollBar && scrollBar.removeEventListener("scroll", init)
      window.removeEventListener("resize", init)
      window.removeEventListener("click", init)
    }
  }, [])

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <div className="absolute left-0 w-full h-4 overflow-x-auto overflow-y-hidden z-[5]" ref={scrollBg}>
        <div className=" h-4" ref={scrollThumb}></div>
      </div>
      <div className="overflow-x-auto" ref={scrollContainer}>
        {/* <Table {...rest} refTable={TableContainer} /> */}
        <table ref={TableContainer} className="h-[1000px] w-[2000px]">
          sssss
        </table>
      </div>
    </div>
  )
}

export default CustomScrollTable
