import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUpgradeStatus = async (user: string) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/upgradeRequest/${user}`
    );

    if (response.data) {
      return response?.data?.user;
    }
  } catch (e: any) {
    return e.message;
  }
};

export default getUpgradeStatus;
