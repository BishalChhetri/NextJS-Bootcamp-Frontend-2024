"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useUpdateModal from "@/app/hooks/useUpdateModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { updateUser } from "@/app/api/user/route";

const UpdateModal = () => {
  const updateModal = useUpdateModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      newPassword: "",
      newConfirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.newPassword !== data.newConfirmPassword) {
      toast.error("New Password and New Confirm Password do not match!");
      setIsLoading(false);
      return;
    }

    if (data.newPassword === data.password) {
      toast.error("The current password and the new password match!");
      setIsLoading(false);
      return;
    }

    if (data.newPassword.length <= 5) {
      toast.error("The password must be greater than 5 characters in length!");
      setIsLoading(false);
      return;
    }
    const userData = {
      currentPassword: data.password,
      newPassword: data.newPassword,
    };

    try {
      const response = await updateUser({ data: userData });

      if (response) {
        toast.success("Success!");
        reset();
        updateModal.onClose();
      }
    } catch (error: any) {
      toast.error("Incorrect Password!!");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Update Password" subtitle="Change user password!" />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="newPassword"
        type="password"
        label="New Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="newConfirmPassword"
        type="password"
        label="Confirm New Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={updateModal.isOpen}
      title="User Update"
      actionLabel="Update"
      onClose={updateModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      reset={reset}
    />
  );
};

export default UpdateModal;
