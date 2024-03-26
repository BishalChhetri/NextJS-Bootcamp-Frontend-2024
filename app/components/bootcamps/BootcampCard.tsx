"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { SafeBootcamp, SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import ConfirmationModal from "@/app/components/modals/confirmationModal";
import deleteOneBootcamp from "@/app/api/bootcamp/deleteOneBootcamp";

interface BootcampCardProps {
  data: SafeBootcamp | null;
  currentUser: SafeUser | null;
}

const BootcampCard: React.FC<BootcampCardProps> = ({ data, currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const handleBootcampClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    return router.push(`/bootcamps/${data?._id}`);
  };

  const toggleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((value) => !value);
  }, []);

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const response = await ConfirmationModal({
        text: `Are you sure you want to delete  ${data?.name} bootcamp? This will also delete the courses and reviews associated with this bootcamp!`,
        confirmButtonText: "Yes, Delete",
        icon: "warning",
      });
      if (response.isConfirmed) {
        const response = await deleteOneBootcamp(data?._id);
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
      onClick={handleBootcampClick}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data?.photo as string}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          {currentUser?.role === "admin" && (
            <div
              className="absolute top-2 right-1 p-1 rounded-full hover:rounded-full hover:bg-yellow-200 transition cursor-pointer"
              onClick={toggleOpen}
            >
              <BsThreeDotsVertical color="black" />
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
        <div className="font-semibold text-lg">{data?.name}</div>
        <div className="font-light text-neutral-500">{data?.description}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {data?.averageCost || 0}</div>
          <div className="font-light text-xs">Avg Cost</div>
        </div>

        <div className="flex flex-row justify-between p-1">
          {data?.courses && (
            <div>
              <span className="font-bold">Courses</span> :{" "}
              {data?.courses?.length}
            </div>
          )}
          {data?.averageRating && (
            <div className="flex flex-row">
              <span className="font-bold me-1">Rating: </span>
              <StarRatingComponent
                name="Rating"
                value={data?.averageRating}
                starCount={5}
                starColor={"#ffb400"}
                emptyStarColor={"#ccc"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BootcampCard;
