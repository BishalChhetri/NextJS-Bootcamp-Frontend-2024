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
    const token = session?.user?.token;
    return token;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
