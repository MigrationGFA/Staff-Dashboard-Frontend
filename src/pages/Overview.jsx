import DailyAttendance from "../component/overview/DailyAttendance";
import OverviewAttendanceBarchart from "../component/overview/OverviewAttendanceBarchart";
import OverviewDailyProjectStats from "../component/overview/OverviewDailyProjectStats";
import OverviewGreetings from "../component/overview/OverviewGreetings";
import OverviewStats from "../component/overview/OverviewStats";
import DashboardLayout from "../layout/DashboardLayout";

const Overview = () => {
  return (
    <DashboardLayout>
      <OverviewGreetings />
      <OverviewStats />
      <DailyAttendance />
      <OverviewDailyProjectStats />
      <OverviewAttendanceBarchart />
    </DashboardLayout>
  );
};

export default Overview;
