export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/mybootcamp/:userId*",
    "/bootcamps/:bootcampId*",
    "/courses/:courseId*",
    "/request",
    "/profile",
  ],
};
