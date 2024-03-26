"use server";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import jwt from "jsonwebtoken";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getSessionToken() {
  try {
    const session = await getSession();
    let token;
    if (session?.user && !session?.user?.token) {
      token = jwt.sign(
        { id: session?.user?._id },
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
        {
          expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRES,
        }
      );
    } else {
      token = session?.user?.token;
    }
    return token;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
