import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getCourses = async (bootcampId: string | undefined) => {
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

export default getCourses;
