import { Chart } from "react-chartjs-2"
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
import { useEffect, useRef } from "react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface LineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  width?: number
  height?: number
}

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false
  },
  stacked: false,
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

function LineChart({ data, width, height }: LineChartProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    const chart = chartRef.current

    if (chart) {
      window.addEventListener('beforeprint', () => {
        chart.resize(600, 600);
      });
      window.addEventListener('afterprint', () => {
        chart.resize();
      });
       
    }

    return () => {
      if (chart) {
        chart?.destroy()
      }
    }
  }, [])

  return <Chart type="line" options={options} data={data} width={width} height={height} ref={chartRef} />
}

export default LineChart
