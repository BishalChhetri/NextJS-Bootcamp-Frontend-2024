import { getCourses } from "../api/course/route";

interface IParams {
  bootcampId?: string;
}

export default async function getCoursesByBootcampId(params: IParams) {
  try {
    const { bootcampId } = params;

    const courses = await getCourses(bootcampId);
    if (!courses) {
      return null;
    }

    return courses?.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
