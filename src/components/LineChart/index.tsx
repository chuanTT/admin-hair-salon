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
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false
  },
  plugins: {
    title: {
      display: false
    },
    legend: {
      position: "bottom" as const
    }
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const
    },

    x: {
      grid: {
        display: false
      },

      ticks: {
        // Include a dollar sign in the ticks
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: function (value: any) {
          return value + 1
        }
      }
    }
  }
}

function LineChart({ data, height }: LineChartProps) {
  return (
    <div style={{ width: "100%", height: height }}>
      <Line options={options} data={data} />
    </div>
  )
}

export default LineChart
