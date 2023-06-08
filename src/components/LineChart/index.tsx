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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  width?: number
  height?: number
}

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
    },
  },
  // scales: {
  //   y: {
  //     type: 'linear' as const,
  //     display: true,
  //     position: 'left' as const,
  //   },
  //   y1: {
  //     type: 'linear' as const,
  //     display: true,
  //     position: 'right' as const,
  //     grid: {
  //       drawOnChartArea: false,
  //     },
  //   },
  // },
};

function LineChart({ data, width, height }: LineChartProps) {
  return <Line options={options} data={data} width={width} height={height} />
}

export default LineChart
