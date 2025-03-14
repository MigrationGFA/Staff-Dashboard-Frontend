import DashboardLayout from "../../layout/DashboardLayout";
import HelpCenterGreetings from "./HelpCenterGreetings";
import HelpCenterMessageForm from "./HelpCenterMessageForm";

const HelpCenterMessagePage = () => {
  return (
    <DashboardLayout>
      <HelpCenterGreetings />
      <HelpCenterMessageForm />
    </DashboardLayout>
  );
};

export default HelpCenterMessagePage;
