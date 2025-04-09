import TrainingCards from "../component/training/TrainingCards";
import TrainingHeader from "../component/training/TrainingHeader";
import DashboardLayout from "../layout/DashboardLayout";

const Training = () => {
  return (
    <DashboardLayout>
      <TrainingHeader /> <TrainingCards />
    </DashboardLayout>
  );
};

export default Training;
