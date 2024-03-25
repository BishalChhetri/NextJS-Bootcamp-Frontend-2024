import axios from "axios";
import { SafeUser } from "@/app/types";
import { getSessionToken } from "@/app/actions/getSessionToken";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface getActiveUserProps {
  email: String;
}

interface registerUserProps {
  data: {
    name: String | null;
    email: String | null;
    password: String | null;
  };
}
interface updateUserProps {
  data: {
    currentPassword: String | null;
    newPassword: String | null;
  };
}

export const getActiveUser = async ({
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
    console.log(e.message);
  }
};

export const registerUser = async ({
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

export const updateUser = async ({
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
