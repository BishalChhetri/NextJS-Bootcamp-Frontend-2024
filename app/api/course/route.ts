import { getSessionToken } from "@/app/actions/getSessionToken";
import { SafeCourse } from "@/app/types";
import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getOneCourse = async (courseId: string | undefined) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/courses/${courseId}`
    );
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
    console.log(e);
    throw new Error(
      JSON.parse(e.request.response).message ||
        e.message ||
        "Something went wrong!"
    );
  }
};

export const deleteOneCourse = async (courseId: string | undefined) => {
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

export const getCourses = async (bootcampId: string | undefined) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/courses/bootcamp/${bootcampId}`
    );
    if (response) {
      return { data: response?.data?.courses };
    }
  } catch (e: any) {
    throw new Error(
      JSON.parse(e.request.response).message ||
        e.message ||
        "Something went wrong!"
    );
  }
};
