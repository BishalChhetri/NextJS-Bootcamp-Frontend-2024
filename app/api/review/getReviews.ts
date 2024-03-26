import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getReviews = async (bootcampId: string | undefined) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/reviews/bootcamp/${bootcampId}`
    );

    if (response) {
      return { data: response?.data?.data };
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export default getReviews;
