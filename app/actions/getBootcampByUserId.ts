import getBootcamp from "../api/bootcamp/getBootcamp";

interface IParams {
  userId?: string;
}

export default async function getBootcampByUserId(params: IParams) {
  try {
    const { userId } = params;

    const bootcamp = await getBootcamp(userId);
    if (!bootcamp) {
      return null;
    }
    return bootcamp?.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
