"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useAddBootcampModal from "@/app/hooks/useAddBootcampModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import ImageUpload from "../inputs/ImageUpload";
import MultiSelect from "../inputs/MultiSelect";
import { createBootcamp } from "@/app/api/bootcamp/route";

enum STEPS {
  BASIC = 0,
  INFO = 1,
  LOCATION = 2,
}

const AddBootcampModal = () => {
  const router = useRouter();

  const addBootcampModal = useAddBootcampModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.BASIC);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      website: "",
      phone: "",
      email: "",
      address: "",
      careers: [],
      photo: "",
      housing: false,
      jobAssistance: false,
      jobGuarantee: false,
      acceptGi: false,
    },
  });

  const photo = watch("photo");
  const address = watch("address");
  const careers = watch("careers");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASIC) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.LOCATION) {
      return onNext();
    }

    if (data.careers && data.careers.length === 0) {
      return toast.error("Career field is mandatory!");
    }

    if (
      data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null
    ) {
      toast.error("Please enter valid email!");
      setIsLoading(false);
      return;
    }

    if (
      data.website &&
      data.website.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      ) === null
    ) {
      return toast.error("Please use a valid URL with HTTP or HTTPS!");
    }

    if (typeof data?.photo === "string" && data.photo.length === 0) {
      delete data.photo;
    }

    const finalData = {
      ...data,
      careers: data?.careers.map((data: any) => data?.label),
    };
    setIsLoading(true);

    try {
      const response = await createBootcamp(finalData);
      if (response) {
        setIsLoading(false);
        router.refresh();
        reset();
        setStep(0);
        toast.success("Bootcamp created!");
        addBootcampModal.onClose();
      }
    } catch (e: any) {
      toast.error(
        e.message ===
          "Bootcamp validation failed: website: Please use a valid URL with HTTP or HTTPS"
          ? "Please use a valid URL with HTTP or HTTPS"
          : "Something went wrong. Validation error!"
      );
      setIsLoading(false);
    }
  };

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create your bootcamp" subtitle="Add bootcamp!" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="website"
        type="text"
        label="Website"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        type="text"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="How to get in touch?"
          subtitle="Help user know about bootcamp careers, phone and address?"
        />

        <Input
          id="phone"
          type="number"
          label="Phone"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="address"
          type="text"
          label="Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <MultiSelect
          value={careers}
          onChange={(value) => setCustomValue("careers", value)}
        />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your bootcamp"
            subtitle="Show user what your bootcamp looks like!"
          />
          <ImageUpload
            value={photo}
            onChange={(value) => setCustomValue("photo", value)}
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={addBootcampModal.isOpen}
      title="Add Bootcamp"
      actionLabel={actionLabel}
      onClose={addBootcampModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.BASIC ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default AddBootcampModal;
