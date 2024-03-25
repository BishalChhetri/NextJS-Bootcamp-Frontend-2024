import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login" showReset />
    );
  }

  return (
    <div>
      <ProfileClient currentUser={currentUser} />
    </div>
  );
};

export default ProfilePage;
