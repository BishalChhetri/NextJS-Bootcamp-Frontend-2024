import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getBootcamp = async (userId: string | undefined) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/bootcamps/user/${userId}`
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

export default getBootcamp;
