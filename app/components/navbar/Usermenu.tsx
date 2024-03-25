"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useAddBootCampModal from "@/app/hooks/useAddBootcampModal";
import ConfirmationModal from "@/app/components/modals/confirmationModal";
import { getUpgradeStatus, upgradeUser } from "@/app/api/upgradeUser/route";
import { toast } from "react-hot-toast";
import getBootcampIdByUser from "@/app/actions/getBootcampByUserId";
import useAddCourseModal from "@/app/hooks/useAddCourseModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpgradeStatusPending, setIsUpgradeStatusPending] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const addBootcampModal = useAddBootCampModal();
  const addCourseModal = useAddCourseModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleBootcampClick = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    return router.push(`/mybootcamp/${currentUser?._id}`);
  };

  const fetchUpgradeStatus = async () => {
    if (currentUser) {
      const res = await getUpgradeStatus(currentUser?._id);
      if (res[0]?.user === currentUser?._id) {
        setIsUpgradeStatusPending(true);
      }
    }
  };

  const checkBootcamp = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    const bootcampIdRes = await getBootcampIdByUser({
      userId: currentUser?._id,
    });
  }, [router]);

  useEffect(() => {
    fetchUpgradeStatus();
    checkBootcamp();
  }, [router]);

  const handleUpgradeClick = async () => {
    if (isUpgradeStatusPending || currentUser?.status === "pending") {
      return await ConfirmationModal({
        title: "You have already sent the request!",
        text: `Please wait for the admin's response for 24 hours.`,
        icon: "info",
        showConfirmButton: false,
        showCancelButton: false,
      });
    }

    const response = await ConfirmationModal({
      text: `Do you want to upgrade this user to publisher?`,
      confirmButtonText: "Yes, Upgrade",
      icon: "info",
    });

    if (response.isConfirmed) {
      const res = await upgradeUser({ user: currentUser?._id });

      if (res) {
        toast.success(res);
        fetchUpgradeStatus();
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleAddbootcampClick = async () => {
    const bootcampIdRes = await getBootcampIdByUser({
      userId: currentUser?._id,
    });
    if (
      bootcampIdRes &&
      bootcampIdRes?.length === 1 &&
      currentUser?.role !== "admin"
    ) {
      return await ConfirmationModal({
        title: "You have already created a bootcamp!",
        text: `One user can create only one bootcamp.`,
        icon: "info",
        showConfirmButton: false,
        showCancelButton: false,
      });
    }
    addBootcampModal.onOpen();
  };

  const handleAddCourseClick = async () => {
    const bootcampIdRes = await getBootcampIdByUser({
      userId: currentUser?._id,
    });
    if (bootcampIdRes && bootcampIdRes?.length === 0) {
      return await ConfirmationModal({
        title: "Bootcamp Required!",
        text: `Please create a bootcamp before adding a course.`,
        icon: "info",
        showConfirmButton: false,
        showCancelButton: false,
      });
    }
    addCourseModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {(!currentUser || currentUser?.role !== "user") && (
          <div
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={handleBootcampClick}
          >
            My Bootcamp
          </div>
        )}
        {currentUser && currentUser?.role === "user" && (
          <div
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={handleUpgradeClick}
          >
            {isUpgradeStatusPending || currentUser?.status === "pending"
              ? `Request Pending`
              : `Upgrade to Publisher`}
          </div>
        )}

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/profile")}
                  label="My Profile"
                />
                {(!currentUser || currentUser?.role !== "user") && (
                  <MenuItem onClick={handleBootcampClick} label="My Bootcamp" />
                )}
                {currentUser && currentUser?.role === "user" && (
                  <MenuItem
                    onClick={handleUpgradeClick}
                    label={
                      isUpgradeStatusPending ||
                      currentUser?.status === "pending"
                        ? `Request Pending`
                        : `Upgrade to Publisher`
                    }
                  />
                )}
                {(currentUser.role === "admin" ||
                  currentUser.role === "publisher") && (
                  <MenuItem
                    onClick={handleAddbootcampClick}
                    label="Add Bootcamp"
                  />
                )}
                {(currentUser.role === "admin" ||
                  currentUser.role === "publisher") && (
                  <MenuItem onClick={handleAddCourseClick} label="Add Course" />
                )}
                {currentUser.role === "admin" && (
                  <MenuItem
                    onClick={() => router.push("/request")}
                    label="Request"
                  />
                )}
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
