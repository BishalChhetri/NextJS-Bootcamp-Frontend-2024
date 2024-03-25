"use client";

import { ColumnDef } from "@tanstack/react-table";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import { SafeUpgradeRequest } from "../types";
import {
  acceptUpgradeUsers,
  rejectUpgradeUsers,
} from "../api/upgradeUser//route";

const router = useRouter();

export const columns: ColumnDef<SafeUpgradeRequest>[] = [
  {
    accessorKey: "id",
    header: "S.N.",
    cell: ({ row }) => {
      return <div className="font-medium">{parseInt(row?.id) + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row?.original?.users?.name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="font-medium">{row?.original?.users?.email}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const users = row.original;
      const handleAcceptClicked = async () => {
        const response = await acceptUpgradeUsers(users?._id);
        if (response?.user) {
          router.refresh();
          toast.success("User role upgraded sucessfully!");
        } else {
          toast.error("Something went wrong!");
        }
      };

      const handleRejectClicked = async () => {
        const response = await rejectUpgradeUsers(users?._id);
        if (response) {
          router.refresh();
          toast.success(response.message);
        } else {
          toast.error("Something went wrong!");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 border-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAcceptClicked}>
              <span className="me-1">Accept</span>{" "}
              <TiTick size={20} color="#22bb33" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleRejectClicked}>
              <span className="me-2">Reject</span>
              <ImCross size={12} color="#bb2124" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
