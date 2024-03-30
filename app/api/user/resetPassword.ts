import axios from "axios";
import { SafeUser } from "@/app/types";
import { toast } from "react-hot-toast";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface resetPasswordProps {
  data: {
    email: String | null;
  };
}

const resetPassword = async ({
  data,
}: resetPasswordProps): Promise<SafeUser | undefined> => {
  try {
    const response = await axios.post(
      `${BackendUrl}/api/v1/auth/forgotPassword`,
      data
    );
    if (response.data) {
      return response?.data;
    }
  } catch (e: any) {
    toast.error(`${e.response.data.error}!` || "Something went wrong!");
  }
};

export default resetPassword;
