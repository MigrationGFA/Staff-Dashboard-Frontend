import TaskTable from "../component/task/TaskTable";
import TotalTasks from "../component/task/TotalTasks";
import DashboardLayout from "../layout/DashboardLayout";

const Tasks = () => {
  return (
    <DashboardLayout>
      <TotalTasks />
      <TaskTable />
    </DashboardLayout>
  );
};

export default Tasks;
