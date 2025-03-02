import AnonymousFormGreetings from "../component/anonymousForm/AnonymousFormGreetings";
import AnonymousMessageForm from "../component/anonymousForm/AnonymousMessageForm";
import DashboardLayout from "../layout/DashboardLayout";

const AnonymousForm = () => {
  return (
    <DashboardLayout>
      <AnonymousFormGreetings />
      <AnonymousMessageForm />
    </DashboardLayout>
  );
};

export default AnonymousForm;
