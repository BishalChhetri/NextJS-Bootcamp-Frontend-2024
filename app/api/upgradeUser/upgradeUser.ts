import axios from "axios";
import { getSessionToken } from "@/app/actions/getSessionToken";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const upgradeUser = async (user: { user: string | undefined }) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.post(
      `${BackendUrl}/api/v1/upgradeRequest`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      return response?.data?.message;
    }
  } catch (e: any) {
    return e?.response?.data?.error === "Duplicate field value entered"
      ? "You have already requested to upgrade!"
      : "Something went Wrong!";
  }
};

export default upgradeUser;
