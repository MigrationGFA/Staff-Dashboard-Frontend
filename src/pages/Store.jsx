import StoreTable from "../component/tables/StoreTable";
import ChartSection from "../component/store-page/ChartSection";
import Welcome from "../component/Welcome";
import DashboardLayout from "../layout/DashboardLayout";

const Store = () => {
  return (
    <DashboardLayout>
      <Welcome header="Store" />
      {/* <Stats /> */}
      <ChartSection page="store" />

      <StoreTable />
    </DashboardLayout>
  );
};

export default Store;
