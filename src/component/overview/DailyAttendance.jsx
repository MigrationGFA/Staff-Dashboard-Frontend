import { ButtonSmallPurple } from "../Buttons";
import { ShortInputWithPlaceholder } from "../Inputs";
import { Heading } from "../Text";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { showToast } from "../ShowToast";
import { FaSpinner } from "react-icons/fa"; // optional spinner icon

const DailyAttendance = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const email = useSelector((state) => state.auth?.user?.email);

  const handleCheckIn = async () => {
    if (!code.trim()) return;
    setIsLoading(true);

    try {
      const response = await api.checkIn({
        accessToken,
        refreshToken,
        email,
        code,
      });
      showToast(response?.message);
    } catch (error) {
      console.error("Error submitting check-in:", error);
      showToast("Failed to check in. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 flex flex-col lg:flex-row items-center justify-between gap-2">
      <div className="flex flex-col lg:flex-row items-center gap-2 lg:space-x-4">
        <Heading
          className="text-2xl lg:text-xl text-sec11"
          weight="font-semibold"
          font="font-body"
        >
          Daily Attendance Code
        </Heading>
        <ShortInputWithPlaceholder
          placeholder="Input Code..."
          className="border-primary3 border-2 focus:ring-primary11 rounded-lg text-sec11"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          required
        />
      </div>
      <ButtonSmallPurple
        className="py-3 px-3.5 rounded-lg flex items-center justify-center"
        bg="primary3"
        onClick={handleCheckIn}
        disabled={!code.trim() || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <FaSpinner className="animate-spin text-white text-base" />
            <span>Checking In...</span>
          </div>
        ) : (
          "Check In"
        )}
      </ButtonSmallPurple>
    </div>
  );
};

export default DailyAttendance;
