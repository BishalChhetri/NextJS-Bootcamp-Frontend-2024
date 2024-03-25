"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import useAddBootCampModal from "@/app/hooks/useAddBootcampModal";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  label?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Not found!",
  subtitle = "try changing or going back to home",
  showReset,
  label,
}) => {
  const router = useRouter();
  const addBootcampModal = useAddBootCampModal();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label={label || "Go back to Home"}
            onClick={
              label === "Create bootcamp"
                ? () => addBootcampModal.onOpen()
                : () => router.push("/")
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
