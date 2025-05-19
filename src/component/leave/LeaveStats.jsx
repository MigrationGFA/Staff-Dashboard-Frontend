import { useSelector } from "react-redux";
import { TextSpan } from "../Text";
import { useEffect, useState } from "react";
import api from "../../api/dashboardApi";

const LeaveStats = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [totalLeave, settotalLeave] = useState([]);

  const fetchTotalLeave = async () => {
    try {
      const response = await api.getLeaveSummary({
        accessToken,
        refreshToken,
        userId: user.userId,
      });

      settotalLeave(response?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotalLeave();
  }, [accessToken, refreshToken]);

  return (
    <div className="pb-6 grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between text-white">
      <div className="flex flex-col justify-center shadow-xl rounded-lg p-4 bg-gradient-to-tr from-[#935092] to-sec11 space-y-4 hover:scale-105 transition duration-300">
        <TextSpan size="" color="" className="text-xl text-white">
          Total Leave Days
        </TextSpan>
        <TextSpan size="" color="" className="text-3xl">
          {totalLeave?.totalLeaveDays || 0}
        </TextSpan>
      </div>
      <div className="flex flex-col shadow-xl rounded-lg p-4 bg-gradient-to-tr from-[#238926] to-sec11 space-y-4 hover:scale-105 transition duration-300">
        <TextSpan size="" color="" className="text-xl">
          Requested Leave Days
        </TextSpan>
        <TextSpan size="" color="" className="text-3xl">
          {totalLeave?.requestedLeaveCount || 0}
        </TextSpan>
      </div>
      <div className="flex flex-col shadow-xl rounded-lg p-4 bg-gradient-to-tr  from-[#CF8611] to-sec11 space-y-4 hover:scale-105 transition duration-300">
        <TextSpan size="" color="" className="text-xl">
          Pending Leave Days
        </TextSpan>
        <TextSpan size="" color="" className="text-3xl">
          {totalLeave?.pendingLeaveCount || 0}
        </TextSpan>
      </div>
    </div>
  );
};

export default LeaveStats;
