"use client";

import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import { SafeUser } from "@/app/types";
import ConfirmationModal from "@/app/components/modals/confirmationModal";
import { deleteOneBootcamp } from "@/app/api/bootcamp/route";
import { deleteOneCourse } from "@/app/api/course/route";

interface BootcampHeadProps {
  id: string;
  title: string;
  locationValue?: string;
  imageSrc: string;
  currentUser?: SafeUser | null;
  course?: boolean;
  bootcampId?: string;
  canEditDelete?: boolean;
}

const BootcampHead: React.FC<BootcampHeadProps> = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser,
  course = false,
  bootcampId,
  canEditDelete = false,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((value) => !value);
  }, []);

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const response = await ConfirmationModal({
        text: `${
          course
            ? `Are you sure you want to delete  ${title} course?`
            : `Are you sure you want to delete  ${title} bootcamp? This will also delete the courses and reviews associated with this bootcamp!`
        }`,
        confirmButtonText: "Yes, Delete",
        icon: "warning",
      });
      if (response.isConfirmed) {
        let response;
        if (!course) {
          response = await deleteOneBootcamp(id);
        } else {
          response = await deleteOneCourse(id);
        }
        if (response) {
          course ? router.push(`/bootcamps/${bootcampId}`) : router.refresh();
          router.refresh();
          toast.success("Sucessfully deleted!");
        }
      }
    },
    [router]
  );

  return (
    <>
      <Heading title={title} subtitle={`${locationValue}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        {canEditDelete && (
          <div
            className="absolute top-2 right-1 p-1 rounded-full hover:rounded-full hover:bg-yellow-200 transition cursor-pointer"
            onClick={toggleOpen}
          >
            <BsThreeDotsVertical color="black" />
          </div>
        )}
        {isOpen && (
          <div
            className="absolute rounded-xl shadow-md  md:w-1/8 bg-white overflow-hidden right-1 top-1 text-sm"
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
    </>
  );
};

export default BootcampHead;
