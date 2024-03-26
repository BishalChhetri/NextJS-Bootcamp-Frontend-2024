import axios from "axios";
import { SafeUser } from "@/app/types";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface registerUserProps {
  data: {
    name: String | null;
    email: String | null;
    password: String | null;
  };
}

const registerUser = async ({
  data,
}: registerUserProps): Promise<SafeUser | undefined> => {
  try {
    const response = await axios.post(
      `${BackendUrl}/api/v1/auth/register`,
      data
    );
    if (response.data) {
      return response?.data?.user;
    }
  } catch (e: any) {
    throw new Error(
      e?.response?.data?.error.startsWith(
        "E11000 duplicate key error collection: bootcamp.users"
      )
        ? "This email is already associated with an account!"
        : "Something went wrong!"
    );
  }
};

export default registerUser;
