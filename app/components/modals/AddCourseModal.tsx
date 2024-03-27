"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import ImageUpload from "../inputs/ImageUpload";
import useAddCourseModal from "@/app/hooks/useAddCourseModal";
import SingleSelect from "../inputs/SingleSelect";
import createCourse from "@/app/api/course/createCourse";

enum STEPS {
  BASIC = 0,
  INFO = 1,
}

const minimumSkillOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Amateur", label: "Amateur" },
  { value: "Expert", label: "Expert" },
];

const scholarhipAvailableOptions = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const AddCourseModal = () => {
  const router = useRouter();
  const params = useParams<{ bootcampId: string; item: string }>();

  const addCourseModal = useAddCourseModal();

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
      title: "",
      description: "",
      weeks: "",
      tuition: "",
      image: "",
      minimumSkill: "",
      scholarhipAvailable: false,
    },
  });

  const image = watch("image");
  const scholarhipAvailable = watch("scholarhipAvailable");
  const minimumSkill = watch("minimumSkill");

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
    if (step === STEPS.INFO) {
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
    if (step !== STEPS.INFO) {
      return onNext();
    }

    setIsLoading(true);

    if (typeof data?.image === "string" && data.image.length === 0) {
      delete data.image;
    }

    let finalData = {
      ...data,
      minimumSkill: data?.minimumSkill?.value,
      scholarshipAvailable: data?.scholarhipAvailable?.value,
    };

    try {
      const response = await createCourse({
        bootcampId: params?.bootcampId,
        data: finalData,
      });
      if (response) {
        setIsLoading(false);
        router.refresh();
        reset();
        setStep(0);
        toast.success("Course created!");
        addCourseModal.onClose();
      }
    } catch (e: any) {
      toast.error(e.message || "Something went wrong.");
      setIsLoading(false);
    }
  };

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your course"
          subtitle="Show user what your course looks like!"
        />
        <ImageUpload
          value={image}
          onChange={(value) => setCustomValue("image", value)}
        />
      </div>
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Create your course" subtitle="Add course!" />
        <Input
          id="title"
          label="Name"
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
        <Input
          id="weeks"
          type="number"
          label="Weeks"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="tuition"
          type="number"
          label="Tuition"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <SingleSelect
          value={minimumSkill}
          onChange={(value) => setCustomValue("minimumSkill", value)}
          options={minimumSkillOptions}
          placeholder="Minimum Skills"
        />
        <SingleSelect
          value={scholarhipAvailable}
          onChange={(value) => setCustomValue("scholarhipAvailable", value)}
          options={scholarhipAvailableOptions}
          placeholder="Scholarship"
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={addCourseModal.isOpen}
      title="Add Course"
      actionLabel={actionLabel}
      onClose={addCourseModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.BASIC ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default AddCourseModal;
