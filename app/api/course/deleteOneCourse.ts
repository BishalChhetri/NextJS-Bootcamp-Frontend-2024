import { getSessionToken } from "@/app/actions/getSessionToken";
import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const deleteOneCourse = async (courseId: string | undefined) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.delete(
      `${BackendUrl}/api/v1/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      return { data: response?.data?.data };
    }
  } catch (e: any) {
    throw new Error(
      JSON.parse(e.request.response).message ||
        e.message ||
        "Something went wrong!"
    );
  }
};

export default deleteOneCourse;
