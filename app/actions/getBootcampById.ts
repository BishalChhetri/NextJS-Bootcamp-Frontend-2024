import getOneBootcamp from "../api/bootcamp/getOneBootcamp";

interface IParams {
  bootcampId?: string;
}

export default async function getBootcampById(params: IParams) {
  try {
    const { bootcampId } = params;

    const bootcamp = await getOneBootcamp(bootcampId);
    if (!bootcamp) {
      return null;
    }

    return bootcamp?.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
