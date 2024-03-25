import { getReviews } from "../api/review/route";

interface IParams {
  bootcampId?: string;
}

export default async function getReviewsByBootcampId(params: IParams) {
  try {
    const { bootcampId } = params;

    const reviews = await getReviews(bootcampId);
    if (!reviews) {
      return null;
    }

    return reviews?.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
