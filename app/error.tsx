"use client";

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <EmptyState
        title={"Uh oh!"}
        subtitle={"Something went wrong!"}
        showReset
      />
    </div>
  );
};

export default ErrorState;