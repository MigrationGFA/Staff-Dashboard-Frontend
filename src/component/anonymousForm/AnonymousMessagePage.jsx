import AnonymousMessageForm from "./AnonymousMessageForm";
import AnonymousFormGreetings from "./AnonymousFormGreetings";
import DashboardLayout from "../../layout/DashboardLayout";

const AnonymousMessagePage = () => {
  return (
    <DashboardLayout>
      <AnonymousFormGreetings />
      <AnonymousMessageForm />
    </DashboardLayout>
  );
};

export default AnonymousMessagePage;
