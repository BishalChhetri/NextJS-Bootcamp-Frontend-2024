"use server";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getActiveUser } from "../api/user/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await getActiveUser({ email: session.user.email });

    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
    };
  } catch (error: any) {
    return null;
  }
}