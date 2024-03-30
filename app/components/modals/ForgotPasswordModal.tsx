"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useForgotPasswordModal from "@/app/hooks/useForgotPasswordModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import resetPassword from "@/app/api/user/resetPassword";

const ForgotPasswordModal = () => {
  const router = useRouter();
  const forgotPasswordModal = useForgotPasswordModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (
      data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null
    ) {
      toast.error("Please enter valid email!");
      setIsLoading(false);
      return;
    }

    const userData = { email: data.email };

    try {
      const response = await resetPassword({ data: userData });
      if (response) {
        toast.success("Please check your email to reset your password!");
        reset();
        forgotPasswordModal.onClose();
      }
    } catch (error: any) {
      toast.error(
        "This email is not associated with an account!" ||
          "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Password Reset"
        subtitle="Please enter your email to reset your password!"
      />
      <Input
        id="email"
        label="Email"
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
      isOpen={forgotPasswordModal.isOpen}
      title="Forgot Password"
      actionLabel="Continue"
      onClose={forgotPasswordModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      reset={reset}
    />
  );
};

export default ForgotPasswordModal;
