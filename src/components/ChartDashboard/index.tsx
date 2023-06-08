// Import utilities
import LineChart from "../LineChart"

function ChartDashboard() {
  const chartData = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: "Số lượng sản phẩm",
        type: "line",
        data: [65, 59, 80, 81, 56, 55, 40],
        // borderColor: "rgb(105 108 255)",
        // backgroundColor: "rgb(105 108 255, 0.2)",
        // fill: true,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ]
  }

  return <LineChart data={chartData} width={800} height={200} />
}

export default ChartDashboard
