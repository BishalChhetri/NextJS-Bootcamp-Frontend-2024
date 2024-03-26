import axios from "axios";
import { getSessionToken } from "@/app/actions/getSessionToken";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const rejectUpgradeUsers = async (id: string | undefined) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }
    const response = await axios.get(
      `${BackendUrl}/api/v1/upgradeRequest/reject/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      return response?.data;
    }
  } catch (e: any) {
    return e.message || "Something went Wrong!";
  }
};

export default rejectUpgradeUsers;
