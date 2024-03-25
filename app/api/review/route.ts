import axios from "axios";
import { getSessionToken } from "@/app/actions/getSessionToken";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteOneReview = async (reviewId: string | undefined) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.delete(
      `${BackendUrl}/api/v1/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      return { data: response?.data?.text };
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export const getReviews = async (bootcampId: string | undefined) => {
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
