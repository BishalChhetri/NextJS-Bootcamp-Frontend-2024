import { getOneCourse } from "../api/course/route";

interface IParams {
  courseId?: string;
}

export default async function getCourseById(params: IParams) {
  try {
    const { courseId } = params;

    const courses = await getOneCourse(courseId);
    if (!courses) {
      return null;
    }

    return courses?.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
