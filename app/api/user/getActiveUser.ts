import axios from "axios";
import { SafeUser } from "@/app/types";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface getActiveUserProps {
  email: String;
}

const getActiveUser = async ({
  email,
}: getActiveUserProps): Promise<SafeUser | undefined> => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/users/user/${email}`
    );
    if (response.data) {
      return response?.data?.user;
    }
  } catch (e: any) {
    return;
  }
};

export default getActiveUser;
