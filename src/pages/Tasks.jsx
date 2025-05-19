import { useState } from "react";
import TaskTable from "../component/task/TaskTable";
import TotalTasks from "../component/task/TotalTasks";
import DashboardLayout from "../layout/DashboardLayout";

const Tasks = () => {
  const [taskUpdateTrigger, setTaskUpdateTrigger] = useState(0);

  const handleTaskAdded = () => {
    setTaskUpdateTrigger((prev) => prev + 1);
  };

  return (
    <DashboardLayout>
      <TotalTasks taskUpdateTrigger={taskUpdateTrigger} />
      <TaskTable onTaskAdded={handleTaskAdded} />
    </DashboardLayout>
  );
};

export default Tasks;
