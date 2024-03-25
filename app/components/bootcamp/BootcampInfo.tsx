"use client";

import StarRatingComponent from "react-star-rating-component";

import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";

interface BootcampInfoProps {
  user: SafeUser;
  description: string;
  rating: string;
}

const BootcampInfo: React.FC<BootcampInfoProps> = ({
  user,
  description,
  rating,
}) => {
  return (
    <div className="col-span-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Owner: {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>
            <StarRatingComponent
              name="Rating"
              value={parseFloat(rating)}
              starCount={5}
              starColor={"#ffb400"}
              emptyStarColor={"#ccc"}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
    </div>
  );
};

export default BootcampInfo;
