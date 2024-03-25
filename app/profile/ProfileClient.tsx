"use client";

import Image from "next/image";
import { FaUserPen } from "react-icons/fa6";

import Container from "@/app/components/Container";
import { SafeUser } from "../types";
import useUpdateModal from "../hooks/useUpdateModal";

interface ProfileClientProps {
  currentUser: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  const updateModal = useUpdateModal();
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto min-h-[39vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
          <div className="w-[30vh] h-[30vh] overflow-hidden rounded-full relative align-center m-auto">
            <Image
              alt="Image"
              src={currentUser?.image as string}
              fill
              className="object-cover w-full rounded"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold text-black">
                {currentUser?.name}
              </span>
              <div className="flex flex-col mt-5">
                <span className="text-lg font-light text-neutral-600">
                  Email
                </span>
                <span className="text-sm font-light font-semibold text-neutral-800">
                  {currentUser?.email}
                </span>
              </div>
              <div className="flex flex-col mt-5">
                <span className="text-lg font-light text-neutral-600">
                  Role
                </span>
                <span className="text-sm font-light font-semibold text-neutral-800">
                  {currentUser?.role}
                </span>
              </div>
            </div>
            <div>
              <button
                className={`flex flex-end relative disabled:opacity-70 disabled:cursor-not-allowed 
                  rounded-lg hover:opacity-80 transition w-full p-2 text-md font-semibold border-2 hover:border-black mt-0 sm:mt-5
      `}
                onClick={() => updateModal.onOpen()}
              >
                <FaUserPen size={22} />
                <span className="text-end ms-1">Update</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileClient;
