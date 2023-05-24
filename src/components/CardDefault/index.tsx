import { FC, useEffect, useRef, useState } from "react"
import images from "@/assets/img"
import Images from "../Images"
import moment from "moment"

interface CardDefaultProps {
  full_name?: string
}

const CardDefault: FC<CardDefaultProps> = ({ full_name }) => {
  const setTime = useRef<NodeJS.Timeout>()
  const [dataTime, setDataTime] = useState({
    strDate: "",
    strTime: ""
  })
  useEffect(() => {
    setTime.current = setInterval(() => {
      const d = moment()

      const t = d.day()
      let strDate = ""
      if (t === 0) {
        strDate = "Chủ nhật"
      } else {
        strDate = `Thứ ${t + 1}`
      }
      strDate += `, ngày ${d.format("DD/MM/YYYY")}`
      setDataTime({
        strDate,
        strTime: d.format("HH:mm:ss A")
      })
    })

    return () => {
      clearInterval(setTime.current)
    }
  }, [])

  return (
    <div className="card">
      <div className="d-flex items-center row">
        <div className="col-sm-7">
          <div className="card-body">
            <h5 className="card-title text-primary">Xin chào, {full_name ?? "Hair Salon"}! 🎉</h5>
            <span className="block mb-1 text-base">{dataTime.strDate}</span>
            <span className="block mb-3 text-sm">{dataTime.strTime}</span>
            <p className="mb-4">Chúc bạn có một ngày làm việc hiệu quả !</p>
          </div>
        </div>
        <div className="col-sm-5 text-center text-sm-left">
          <div className="card-body pb-0 px-0 px-md-4">
            <Images h={"auto"} w={"100%"} src={images.manWithLaptopLight} alt="View Badge User" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDefault
