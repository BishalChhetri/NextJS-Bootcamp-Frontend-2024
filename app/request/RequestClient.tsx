"use client";

import { SafeUser } from "@/app/types";
import Container from "@/app/components/Container";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import EmptyState from "../components/EmptyState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RequestClientProps {
  data: any;
  currentUser?: SafeUser | null;
}

const RequestClient: React.FC<RequestClientProps> = ({ data, currentUser }) => {
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login" showReset />
    );
  }

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  if (data?.data && data?.data.length === 0) {
    return (
      <EmptyState
        title="No User Upgrade Requests Found"
        subtitle="Looks like there are no user upgrade requests."
        showReset
      />
    );
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <DataTable columns={columns} data={data?.data} />
        </div>
      </div>
    </Container>
  );
};

export default RequestClient;
