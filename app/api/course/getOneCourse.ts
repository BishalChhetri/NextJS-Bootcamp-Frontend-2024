import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getOneCourse = async (courseId: string | undefined) => {
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

export default getOneCourse;
