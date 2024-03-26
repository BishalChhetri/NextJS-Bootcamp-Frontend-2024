import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const userCheck = await axios.get(
            `${backendBaseUrl}/api/v1/users/user/${credentials?.email}`
          );

          if (userCheck?.data?.isEmail === "False") {
            const registerResponse = await axios.post(
              `${backendBaseUrl}/api/v1/auth/register`,
              credentials
            );

            if (registerResponse.status !== 200) {
              throw new Error("Failed to register user");
            }
          }

          const response = await axios.post(
            `${backendBaseUrl}/api/v1/auth/login`,
            credentials
          );
          if (response.status !== 200) {
            throw new Error(response.statusText + "! Invalid credentials");
          }
          
          return response?.data?.user;
        } catch (error: any) {
          throw new Error(error.response.statusText || "Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (user && user.email) {
          const userCheck = await axios.get(
            `${backendBaseUrl}/api/v1/users/user/${user.email}`
          );

          if (userCheck?.data?.isEmail === "False") {
            const registerResponse = await axios.post(
              `${backendBaseUrl}/api/v1/auth/register`,
              { ...user, googleSignIn: "True" }
            );

            if (registerResponse.status !== 200) {
              throw new Error("Failed to register user");
            }
          }
        }
        const response = await axios.post(
          `${backendBaseUrl}/api/v1/auth/login`,
          { ...user, googleSignIn: "True" }
        );

        if (response.status !== 200) {
          throw new Error(response.statusText + "! Invalid credentials");
        }

        return response?.data?.user;
      } catch (error) {
        console.error("Error checking user:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },
    async session({ user, session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
