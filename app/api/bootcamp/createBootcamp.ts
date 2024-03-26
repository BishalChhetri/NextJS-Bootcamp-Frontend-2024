import { getSessionToken } from "@/app/actions/getSessionToken";
import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const createBootcamp = async (data: any) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.post(`${BackendUrl}/api/v1/bootcamps`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      return { data: response?.data?.data };
    }
  } catch (e: any) {
    throw new Error(
      JSON.parse(e.request.response).message || "Something went wrong!"
    );
  }
};

export default createBootcamp;
