"use server";

import isValidToken from "../api/user/isValidToken";

interface IParams {
  token: string;
}

export default async function checkValidToken(params: IParams) {
  try {
    const { token } = params;
    const isValid = await isValidToken({ token });
    if (isValid) {
      return isValid;
    }
  } catch (error: any) {
    return null;
  }
}
