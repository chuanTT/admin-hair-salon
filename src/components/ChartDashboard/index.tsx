// Import utilities
import useFetchingApi from "@/hooks/useFetchingApi"
import LineChart from "../LineChart"
import { getChartDoashBoard, tableOther } from "@/api/otherApi"
import { useMemo, useState } from "react"
import DatePickerField from "../CustomField/DatePicker"
import { DateMothYear } from "@/common/functions"

interface ChartDashboardProps {
  title?: string
  height?: number
}

function ChartDashboard({ title, height = 300 }: ChartDashboardProps) {
  const [date, setDate] = useState({
    m: 0,
    y: 0
  })
  const { data: dataChart } = useFetchingApi({
    nameTable: `${tableOther}/chart_product`,
    CallAPi: getChartDoashBoard,
    customUrl: ({ query, nameTable }) => {
      let url = query?.for(nameTable)

      if (date?.m !== 0 && date?.y !== 0) {
        url = url?.params({ m: date?.m, y: date?.y })
      }

      return url?.url()
    }
  })

  const chartData = useMemo(() => {
    return {
      labels: dataChart?.data?.labels,
      datasets: [
        {
          label: "Số lượng",
          fill: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx
            const gradient = ctx.createLinearGradient(0, 0, 0, height * 2)
            gradient.addColorStop(0, "rgb(105,108,255,1)")
            gradient.addColorStop(1, "rgba(105,108,255,0)")
            return gradient
          },

          borderColor: "#696cff",
          borderWidth: 2,
          pointColor: "#fff",
          pointStrokeColor: "#696cff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#696cff",
          tension: 0.4,
          data: dataChart?.data?.data
        }
      ]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChart])

  return (
    <div className="card h-100">
      <h5 className="card-header m-0 pb-3 flex items-center justify-between gap-4">
        <span>{title}</span>

        <div>
          <DatePickerField
            name="date"
            placeholder="mm/yyyy"
            rest={{
              showMonthYearPicker: true,
              dateFormat: "MM/yyyy",
              onChange: () => ({})
            }}
            onChange={(date) => {
              const { m, y } = DateMothYear(date)
              setDate({
                m,
                y
              })
            }}
          />
        </div>
      </h5>
      <div className="card-body px-0">
        <div className="tab-content flex !p-0">
          <div className="tab-pane fade show active grow !w-full" id="navs-tabs-line-card-income" role="tabpanel">
            <LineChart data={chartData} width={600} height={height} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartDashboard
