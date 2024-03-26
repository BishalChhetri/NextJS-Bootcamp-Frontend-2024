import getCurrentUser from "../actions/getCurrentUser";
import getReqUpgradeUsers from "../api/upgradeUser/getReqUpgradeUsers";
import RequestClient from "./RequestClient";

const RequestPage = async () => {
  const currentUser = await getCurrentUser();

  const requestUpgradeUsers = await getReqUpgradeUsers();

  return (
    <div>
      <RequestClient data={requestUpgradeUsers} currentUser={currentUser} />
    </div>
  );
};

export default RequestPage;
