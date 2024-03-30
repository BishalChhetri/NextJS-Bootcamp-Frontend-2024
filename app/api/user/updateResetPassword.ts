import axios from "axios";
import { SafeUser } from "@/app/types";
import { toast } from "react-hot-toast";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface updateResetPasswordProps {
  data: {
    token: String;
    password: String;
  };
}

const updateResetPassword = async ({
  data,
}: updateResetPasswordProps): Promise<SafeUser | undefined> => {
  try {
    const response = await axios.put(
      `${BackendUrl}/api/v1/auth/resetpassword/${data?.token}`,
      { password: data?.password }
    );
    if (response.data) {
      return response?.data;
    }
  } catch (e: any) {
    toast.error(`${e.response.data.error}!` || "Something went wrong!");
  }
};

export default updateResetPassword;
