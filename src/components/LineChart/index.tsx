import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface LineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  width?: number
  height?: number
}

export const options = {
  responsive: true,
  stacked: false,
  plugins: {
    title: {
      display: false
    }
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false
        }
      }
    },

    "left-y-axis": {
      type: "linear",
      position: "right",
      grid: {
        display: false
      },
    },
  },
}

function LineChart({ data, width, height }: LineChartProps) {
  return <Line options={options} data={data} width={width} height={height} />
}

export default LineChart
