import { useEffect, useState } from "react";
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
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OverviewAttendanceBarchart = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const [timeRange, setTimeRange] = useState("weekly");
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    try {
      const response = await api.getAttendance({
        accessToken,
        refreshToken,
        filter: timeRange,
        userId: user.userId,
      });
      setAttendance(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [accessToken, refreshToken, timeRange]);

  const getColor = (score) => {
    if (score <= 40) return "#FF4C4C"; // Red
    if (score <= 70) return "#FFD93D"; // Yellow
    return "#4CAF50"; // Green
  };

  const getChartData = () => {
    if (timeRange === "weekly") {
      const weeks = attendance.map((item) => item.week);
      const totals = attendance.map((item) => item.averageScore);
      const colors = totals.map(getColor);

      return {
        labels: weeks,
        datasets: [
          {
            label: "Attendance",
            data: totals,
            backgroundColor: colors,
            borderRadius: 5,
          },
        ],
      };
    } else if (timeRange === "monthly") {
      const months = attendance.map((item) => item.month);
      const averageScores = attendance.map((item) => item.averageScore);
      const colors = averageScores.map(getColor);

      return {
        labels: months,
        datasets: [
          {
            label: "Average Score",
            data: averageScores,
            backgroundColor: colors,
            borderRadius: 5,
          },
        ],
      };
    }
  };

  const data = getChartData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`, // Show percentage in tooltip
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`, // Show percentage in y-axis labels
          stepSize: 20,
        },
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
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
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
