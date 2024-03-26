import axios from "axios";
import { SafeUser } from "@/app/types";
import { getSessionToken } from "@/app/actions/getSessionToken";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface updateUserProps {
  data: {
    currentPassword: String | null;
    newPassword: String | null;
  };
}

const updateUser = async ({
  data,
}: updateUserProps): Promise<SafeUser | undefined> => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }
    const response = await axios.put(
      `${BackendUrl}/api/v1/auth/updatePassword`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      return response?.data?.user;
    }
  } catch (e: any) {
    throw new Error(
      e?.response?.data?.error === "Password is incorrect"
        ? "Password is incorrect"
        : "Something went wrong!"
    );
  }
};

export default updateUser;
