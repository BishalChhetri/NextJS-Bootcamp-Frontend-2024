"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeCourse, SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import ConfirmationModal from "@/app/components/modals/confirmationModal";
import deleteOneCourse from "@/app/api/course/deleteOneCourse";

interface CourseProps {
  data: SafeCourse | null;
  currentUser: SafeUser | null;
  canEditDelete?: boolean;
}

const Course: React.FC<CourseProps> = ({
  data,
  currentUser,
  canEditDelete = false,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleCourseClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    return router.push(`/courses/${data?._id}`);
  };

  const toggleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((value) => !value);
  }, []);

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const response = await ConfirmationModal({
        text: `Are you sure you want to delete  ${data?.title} course?`,
        confirmButtonText: "Yes, Delete",
        icon: "warning",
      });
      if (response.isConfirmed) {
        const response = await deleteOneCourse(data?._id);
        if (response) {
          router.refresh();
          toast.success("Sucessfully deleted!");
        }
      }
    },
    [router]
  );

  return (
    <div
      onClick={handleCourseClick}
      className="col-span-1 cursor-pointer group border border-yellow-500 rounded-lg p-3"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data?.image as string}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          {(currentUser?.role === "admin" ||
            (canEditDelete && currentUser?.role === "publisher")) && (
            <div
              className="absolute top-1 -right-2 p-1 rounded-full hover:rounded-full hover:bg-yellow-200 transition cursor-pointer"
              onClick={toggleOpen}
            >
              <BsThreeDotsVertical color="black" />
            </div>
          )}
          {data?.scholarshipAvailable && (
            <div
              className={`absolute top-1 right-3 bg-green-500 rounded-md px-1 text-white font-semibold`}
            >
              <span className="text-xs">Scholarship</span>
            </div>
          )}
          {isOpen && (
            <div
              className="absolute rounded-xl shadow-md  md:w-1/4 bg-white overflow-hidden right-1 top-1 text-sm"
              onMouseLeave={toggleOpen}
            >
              <div className="flex flex-row cursor-pointer">
                <div
                  onClick={handleDelete}
                  className="px-4 py-2 hover:bg-neutral-100 transition font-semibold"
                >
                  Delete
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="font-semibold text-lg mt-2 flex">
          <span>{data?.title}</span>
          {data?.minimumSkill && (
            <div>
              <span className="text-sm ms-2 bg-black text-white rounded-lg px-1">
                {data?.minimumSkill}
              </span>
            </div>
          )}
        </div>
        <div className="font-light text-neutral-500 text-sm">
          {data?.description}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {data?.tuition}</div>
          <div className="font-light text-xs">Cost</div>
        </div>

        <div className="flex flex-row justify-between p-1">
          <div>
            <span className="font-bold">Weeks</span> : {data?.weeks}
          </div>
        </div>

        <div className={`rounded-md px-1  font-semibold`}></div>
      </div>
    </div>
  );
};

export default Course;
