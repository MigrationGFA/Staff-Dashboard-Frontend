import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChartLine } from "react-icons/fa";
import { TextSpan } from "../Text";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OverviewAttendanceBarchart = () => {
  const [timeRange, setTimeRange] = useState("Weekly");

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance",
        data: [40, 45, 25, 65, 55],
        backgroundColor: [
          "#A078F4",
          "#FF0000",
          "#FF0000",
          "#A078F4",
          "#A078F4",
        ],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw}%` } }, // Format tooltip as percentage
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => `${value}%` }, // Format y-axis labels
      },
    },
  };

  return (
    <div className="bg-white p-10 rounded-lg border shadow-lg w-full my-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaChartLine
            size={40}
            className="text-primary5 border shadow p-2 rounded-lg"
          />
          <TextSpan size="" color="" className="text-primary5 text-lg">
            Attendance
          </TextSpan>
        </div>
        {/* Dropdown */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded-md px-2 py-1 text-primary5"
        >
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default OverviewAttendanceBarchart;
