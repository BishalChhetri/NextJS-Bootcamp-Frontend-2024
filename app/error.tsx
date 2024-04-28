"use client";

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
    console.log({ error });
    console.log({ errorMessage: error?.message });
  }, [error]);
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <EmptyState
        title={"Uh oh!"}
        subtitle={`${
          error && error.message === "Error: Connection closed."
            ? "Connection closed due to prolonged inactivity. Please manually hard refresh."
            : "Something went wrong!"
        }`}
        showReset
      />
    </div>
  );
};

export default ErrorState;
