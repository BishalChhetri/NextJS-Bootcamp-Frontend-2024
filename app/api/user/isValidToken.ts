"use server";

import axios from "axios";
import { toast } from "react-hot-toast";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface isValidTokenProps {
  token: string;
}

const isValidToken = async ({
  token,
}: isValidTokenProps): Promise<string | undefined> => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/auth//isValidToken/${token}`
    );
    if (response.data) {
      return response?.data;
    }
  } catch (e: any) {
    toast.error(`Invalid token!` || "Something went wrong!");
    return;
  }
};

export default isValidToken;
