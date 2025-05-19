import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { useEffect, useState } from "react";

const TotalTasks = ({ taskUpdateTrigger }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const [totalProject, setTotalProject] = useState([]);

  const fetchTotalProject = async () => {
    try {
      const response = await api.getTotalProject({
        accessToken,
        refreshToken,
        userId: user.userId,
      });
      setTotalProject(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotalProject();
  }, [accessToken, refreshToken, taskUpdateTrigger]);

  return (
    // <div className="flex flex-col border px-4 py-8 shadow-lg my-4 bg-ter1 rounded-2xl">
    <div className="px-4 pt-6 flex flex-col space-y-2">
      <div className="text-xl lg:text-3xl text-center lg:text-left font-semibold text-black">
        Total Tasks(Weekly)
      </div>
      <div className="text-xl lg:text-3xl text-center lg:text-left text-sec11">
        {totalProject?.totalTask || 0}
      </div>
    </div>
    // </div>
  );
};

export default TotalTasks;
