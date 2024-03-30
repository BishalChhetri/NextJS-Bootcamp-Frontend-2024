"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import updateResetPassword from "@/app/api/user/updateResetPassword";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import useLoginModal from "@/app/hooks/useLoginModal";

interface ResetPasswordClientProps {
  token: string;
}

const ResetPasswordClient: React.FC<ResetPasswordClientProps> = ({ token }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      setIsLoading(false);
      return;
    }

    if (data.password.length < 6) {
      toast.error("The password must be greater than 5 characters in length!");
      setIsLoading(false);
      return;
    }

    const userData = {
      token: token,
      password: data.password,
    };

    try {
      const response = await updateResetPassword({ data: userData });
      if (response) {
        toast.success("Success!");
        reset();
        router.refresh();
        router.push("/");
        loginModal.onOpen();
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto flex justify-center items-center ">
        <div className="flex flex-col gap-6 px-auto w-full sm:w-1/2">
          <div className="flex flex-col gap-4">
            <Heading
              title="Password Reset"
              subtitle="Update or Reset Your Password!"
            />
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
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <Button label="Update" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordClient;
