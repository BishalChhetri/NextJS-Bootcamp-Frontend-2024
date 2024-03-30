import { getSessionToken } from "@/app/actions/getSessionToken";
import { SafeCourse } from "@/app/types";
import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createCourse = async ({
  bootcampId,
  data,
}: {
  bootcampId: string | undefined;
  data: SafeCourse | any;
}) => {
  try {
    const token = await getSessionToken();
    if (!token) {
      throw new Error("Token not available!");
    }
    let response;
    
    if (bootcampId) {
      response = await axios.post(
        `${BackendUrl}/api/v1/courses/${bootcampId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await axios.post(`${BackendUrl}/api/v1/courses`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (response) {
      return { data: response?.data?.course };
    }
  } catch (e: any) {
    throw new Error(
      JSON.parse(e.request.response).message ||
        e.message ||
        "Something went wrong!"
    );
  }
};

export default createCourse;
