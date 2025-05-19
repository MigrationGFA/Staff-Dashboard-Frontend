import { FiClock } from "react-icons/fi";
import TrainingCards from "../component/training/TrainingCards";
import TrainingHeader from "../component/training/TrainingHeader";
import DashboardLayout from "../layout/DashboardLayout";

const Training = () => {
  return (
    <DashboardLayout>
      <div className="relative">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-lg">
          <FiClock className="text-6xl text-primary11 mb-3 " />
          <h2 className="text-3xl font-bold text-primary11">Coming Soon</h2>
          <p className="text-primary11 mt-1">This feature is on the way!</p>
        </div>

        <div className="opacity-20 blur-sm pointer-events-none select-none">
          <TrainingHeader /> <TrainingCards />{" "}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Training;
