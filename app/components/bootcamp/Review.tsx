"use client";

import StarRatingComponent from "react-star-rating-component";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCallback } from "react";

import { SafeReview, SafeUser } from "@/app/types";
import { formatDate } from "@/app/actions/formatDate";
import Avatar from "../Avatar";
import ConfirmationModal from "@/app/components/modals/confirmationModal";
import { deleteOneReview } from "@/app/api/review/route";

interface ReviewProps {
  data: SafeReview;
  currentUser: SafeUser | null;
}

const Review: React.FC<ReviewProps> = ({ data, currentUser }) => {
  const router = useRouter();

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const response = await ConfirmationModal({
        text: `Are you sure you want to delete  ${data?.title} review?`,
        confirmButtonText: "Yes, Delete",
        icon: "warning",
      });
      if (response.isConfirmed) {
        const response = await deleteOneReview(data?._id);
        if (response) {
          router.refresh();
          toast.success("Sucessfully deleted!");
        }
      }
    },
    [router]
  );
  return (
    <div className="col-span-1 group">
      <div className="flex flex-col justify-between py-2 sm:flex-row">
        <div className="flex gap-2 items-center">
          <StarRatingComponent
            name="Rating"
            value={data?.rating}
            starCount={5}
            starColor={"#ffb400"}
            emptyStarColor={"#ccc"}
          />
          <span className="font-light text-neutral-500 text-sm">
            {data?.user.name}
          </span>
          <Avatar src={data?.user.image} />
          {currentUser && currentUser?.role === "admin" && (
            <div
              className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleDelete}
            >
              <RiDeleteBinLine color="#ff0e0e" size={18} />
            </div>
          )}
        </div>
        {data.createdAt && (
          <div className="font-light text-xs text-neutral-500">
            {formatDate(data?.createdAt)}
          </div>
        )}
      </div>
      <div className="font-semibold">{data?.title}</div>
      <div className="font-light text-sm text-neutral-500 pb-6">
        {data?.text}
      </div>
      <hr />
    </div>
  );
};

export default Review;
