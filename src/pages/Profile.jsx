import ProfileForm from "../component/profile/ProfileForm";
import ProfileGreetings from "../component/profile/ProfileGreetings";
import DashboardLayout from "../layout/DashboardLayout";

const Profile = () => {
  return (
    <DashboardLayout>
      <ProfileGreetings />
      <ProfileForm />
    </DashboardLayout>
  );
};

export default Profile;
