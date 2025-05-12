import { ButtonSmallPurple } from "../Buttons";
import { ShortInputWithPlaceholder } from "../Inputs";
import { Heading } from "../Text";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { showToast } from "../ShowToast";

const DailyAttendance = () => {
  const [code, setCode] = useState("");

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const email = useSelector((state) => state.auth?.user?.email);

  const handleCheckIn = async () => {
    try {
      const response = await api.checkIn({
        accessToken,
        refreshToken,
        email,
        code,
      });
      showToast(response?.message)
    } catch (error) {
      console.log("Error submitting check In:", error);
    }
  };

  return (
    <div className="px-4 flex flex-col lg:flex-row items-center justify-between gap-2">
      <div className="flex flex-col lg:flex-row items-center gap-2 lg:space-x-4">
        <Heading
          className="text-2xl lg:text-xl text-sec11"
          size=""
          color=""
          weight="font-semibold"
          font="font-body"
          lineHeight=""
        >
          Daily Attendance Code
        </Heading>
        <ShortInputWithPlaceholder
          placeholder="Input Code..."
          size=""
          color=""
          weight="font-normal"
          lineHeight=""
          className="border-primary3 border-2 focus:ring-primary11 rounded-lg text-sec11"
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <ButtonSmallPurple
        className="py-3 px-3.5 rounded-lg"
        width=""
        bg="primary3"
        padding=""
        height=""
        onClick={handleCheckIn}
      >
        Check In
      </ButtonSmallPurple>
    </div>
  );
};

export default DailyAttendance;
