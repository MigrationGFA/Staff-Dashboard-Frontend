import HelpCenterGreetings from "../component/help-center/HelpCenterGreetings";
import HelpCenterMessageForm from "../component/help-center/HelpCenterMessageForm";
import DashboardLayout from "../layout/DashboardLayout";

const HelpCenter = () => {
  return (
    <DashboardLayout>
      <HelpCenterGreetings />
      <HelpCenterMessageForm />
    </DashboardLayout>
  );
};

export default HelpCenter;
