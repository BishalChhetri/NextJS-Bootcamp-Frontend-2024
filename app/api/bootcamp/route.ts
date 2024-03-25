import { getSessionToken } from "@/app/actions/getSessionToken";
import axios from "axios";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllBootcamp = async () => {
  try {
    const response = await axios.get(`${BackendUrl}/api/v1/bootcamps`);
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

export const getOneBootcamp = async (bootcampId: string | undefined) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/v1/bootcamps/${bootcampId}`
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

export const createBootcamp = async (data: any) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.post(`${BackendUrl}/api/v1/bootcamps`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      return { data: response?.data?.data };
    }
  } catch (e: any) {
    throw new Error(
      JSON.parse(e.request.response).message || "Something went wrong!"
    );
  }
};

export const getBootcamp = async (userId: string | undefined) => {
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

export const deleteOneBootcamp = async (bootcampId: string | undefined) => {
  try {
    const token = await getSessionToken();

    if (!token) {
      throw new Error("Token not available!");
    }

    const response = await axios.delete(
      `${BackendUrl}/api/v1/bootcamps/${bootcampId}`,
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
    throw new Error(
      JSON.parse(e.request.response).message ||
        e.message ||
        "Something went wrong!"
    );
  }
};
