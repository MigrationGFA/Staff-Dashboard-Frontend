import StaffStats from "../component/staff/StaffStats";
import StaffTable from "../component/staff/StaffTable";
import DashboardLayout from "../layout/DashboardLayout";

const Staff = () => {
  return (
    <DashboardLayout>
      <StaffStats />
      <StaffTable />
    </DashboardLayout>
  );
};

export default Staff;
