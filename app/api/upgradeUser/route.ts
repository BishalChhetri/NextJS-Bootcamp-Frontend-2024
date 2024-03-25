import axios from "axios";
import { getSessionToken } from "@/app/actions/getSessionToken";

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

export const upgradeUser = async (user: { user: string | undefined }) => {
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

export const acceptUpgradeUsers = async (id: string | undefined) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.get(
      `${BackendUrl}/api/v1/upgradeRequest/accept/${id}`,
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

export const rejectUpgradeUsers = async (id: string | undefined) => {
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

export const getReqUpgradeUsers = async () => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.get(`${BackendUrl}/api/v1/upgradeRequest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data) {
      return response?.data;
    }
  } catch (e: any) {
    return e.message || "Something went Wrong!";
  }
};
