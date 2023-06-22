// Import utilities
import useFetchingApi from "@/hooks/useFetchingApi"
import LineChart from "../LineChart"
import { getChartDoashBoard, tableOther } from "@/api/otherApi"

interface ChartDashboardProps {
  title?: string
}

function ChartDashboard({ title }: ChartDashboardProps) {
  const { data: dataChart } = useFetchingApi({
    nameTable: `${tableOther}/chart_product`,
    CallAPi: getChartDoashBoard,
    customUrl: ({ query, nameTable }) => {
      return query
        ?.for(nameTable)
        .params({
          m: "5",
          y: "2023"
        })
        .url()
    }
  })

  const height = 300
  const chartData = {
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

  return (
    <div className="card h-100">
      <h5 className="card-header m-0 pb-3">
        <span>{title}</span>
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
