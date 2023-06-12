// Import utilities
import LineChart from "../LineChart"

function ChartDashboard() {
  const height = 150
  const chartData = {
    labels: [
        1,
        2,
        3,
        4,
        5
    ],
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
        data: [60, 30, 20 ,80, 100]
      }
    ]
  }

  return <LineChart data={chartData} width={600} height={height} />
}

export default ChartDashboard
