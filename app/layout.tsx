import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import getCurrentUser from "./actions/getCurrentUser";
import getUpgradeStatus from "./api/upgradeUser/getUpgradeStatus";
import Footer from "./components/footer/Footer";
import AddBootcampModal from "./components/modals/AddBootcampModal";
import AddCourseModal from "./components/modals/AddCourseModal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import UpdateModal from "./components/modals/UpdateModal";
import Navbar from "./components/navbar/Navbar";

import "./globals.css";

import ToasterProvider from "./providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bootcamp",
  description: "Bootcamp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  let status = null;

  if (currentUser) {
    const res = await getUpgradeStatus(currentUser?._id);
    if (res[0]?.user === currentUser?._id) {
      currentUser.status = res[0]?.status || null;
    }
  }

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <UpdateModal />
        <AddBootcampModal />
        <AddCourseModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
