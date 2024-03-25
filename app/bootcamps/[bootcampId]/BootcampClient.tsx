"use client";

import React, { useCallback, useState, useEffect } from "react";
import { MdPostAdd } from "react-icons/md";

import { SafeBootcamp, SafeCourse, SafeReview, SafeUser } from "@/app/types";
import Container from "@/app/components/Container";
import BootcampHead from "@/app/components/bootcamp/BootcampHead";
import BootcampInfo from "@/app/components/bootcamp/BootcampInfo";
import Course from "@/app/components/bootcamp/Course";
import Review from "@/app/components/bootcamp/Review";
import getBootcampByUserId from "@/app/actions/getBootcampByUserId";
import useAddCourseModal from "@/app/hooks/useAddCourseModal";

interface BootcampClientProps {
  bootcamp: SafeBootcamp | any;
  courses: SafeCourse[];
  reviews: SafeReview[];
  currentUser?: SafeUser | null;
}

const BootcampClient: React.FC<BootcampClientProps> = ({
  bootcamp,
  courses,
  reviews,
  currentUser,
}) => {
  const [canEditDelete, setCanEditDelete] = useState(false);
  const courseModal = useAddCourseModal();

  const checkCanEditDelete = useCallback(async () => {
    const bootcampIdRes = await getBootcampByUserId({
      userId: currentUser?._id,
    });
    if (
      currentUser?.role === "admin" ||
      ((bootcampIdRes[0]?._id === bootcamp?._id ||
        bootcampIdRes[0]?._id === courses[0]?.bootcamp) &&
        currentUser?.role === "publisher")
    ) {
      setCanEditDelete(true);
    }
  }, []);

  useEffect(() => {
    checkCanEditDelete();
  }, []);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <BootcampHead
            id={bootcamp._id}
            title={bootcamp.name}
            imageSrc={bootcamp.photo}
            locationValue={
              `${bootcamp.location?.city} ${bootcamp.location?.country}` ||
              bootcamp.location?.formattedAddress
            }
            currentUser={currentUser}
            canEditDelete={canEditDelete}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <BootcampInfo
              user={bootcamp.user}
              description={bootcamp.description}
              rating={bootcamp.averageRating}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-2xl">Courses</div>
            {(currentUser?.role === "admin" || canEditDelete) && (
              <div>
                <button
                  className={`flex flex-end relative disabled:opacity-70 disabled:cursor-not-allowed 
                  rounded-lg hover:opacity-80 transition w-full p-3 text-md font-semibold border-2 hover:border-black
      `}
                  onClick={() => courseModal.onOpen()}
                >
                  <MdPostAdd size={24} />
                  <span className="text-end">Add Course</span>
                </button>
              </div>
            )}
          </div>
          {courses && courses.length === 0 && (
            <div className="text-lg font-light text-neutral-500">
              It seems like you have not created courses yet!
            </div>
          )}
          {courses && courses.length !== 0 && (
            <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
              {courses?.map((course: SafeCourse) => {
                return (
                  <React.Fragment key={course._id}>
                    <Course
                      data={course}
                      currentUser={currentUser || null}
                      canEditDelete={canEditDelete}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          )}

          <hr />
          <div>
            <span className="font-bold text-2xl">Reviews</span>
          </div>
          {reviews && reviews.length === 0 && (
            <div className="text-lg font-light text-neutral-500">
              It seems like this bootcamp have got no reviews!
            </div>
          )}
          {reviews && reviews.length !== 0 && (
            <div className="pt-4 grid grid-cols-1 gap-5">
              {reviews?.map((review: SafeReview) => {
                return (
                  <React.Fragment key={review._id}>
                    <Review data={review} currentUser={currentUser || null} />
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BootcampClient;
