import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      name: string;
      email: string;
      picture: string;
      role: string;
      createdAt: string;
      token: string;
    };
  }
}
