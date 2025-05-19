import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { useEffect, useState } from "react";
const StaffStats = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [staff, setStaff] = useState([]);

  const fetchStaffData = async () => {
    try {
      const response = await api.getStaffDetails({
        accessToken,
        refreshToken,
        department: user?.department,
      });
      setStaff(response?.count);
      console.log(response.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [accessToken, refreshToken]);
  return (
    <div className="flex flex-col border px-4 py-8 shadow-lg my-4 bg-ter1 rounded-2xl">
      <div className="flex flex-col space-y-2">
        <div className="text-xl lg:text-3xl text-center lg:text-left font-semibold text-primary3">
          CO-Staff
        </div>
        <div className="text-xl lg:text-3xl text-center lg:text-left text-sec11">
          {staff ? staff : "0"}
        </div>
      </div>
    </div>
  );
};

export default StaffStats;
