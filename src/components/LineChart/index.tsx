import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface LineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  width?: number
  height?: number
}

export const options = {
  responsive: false,
  scales: {
    y: {
      stacked: false,
      grid: {
        display: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

function LineChart({ data, width, height }: LineChartProps) {

  return <Line options={options} data={data} width={width} height={height} updateMode="resize" />
}

export default LineChart
