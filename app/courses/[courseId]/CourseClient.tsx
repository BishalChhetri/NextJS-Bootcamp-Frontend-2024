"use client";

import { formatDate } from "@/app/actions/formatDate";
import getBootcampByUserId from "@/app/actions/getBootcampByUserId";
import Avatar from "@/app/components/Avatar";
import BootcampHead from "@/app/components/bootcamp/BootcampHead";
import Container from "@/app/components/Container";
import { SafeCourse, SafeUser } from "@/app/types";
import { useCallback, useEffect, useState } from "react";

interface CourseClientProps {
  course: SafeCourse | null;
  currentUser: SafeUser | null;
}

const CourseClient: React.FC<CourseClientProps> = ({ course, currentUser }) => {
  const [canEditDelete, setCanEditDelete] = useState(false);

  const checkCanEditDelete = useCallback(async () => {
    const bootcampIdRes = await getBootcampByUserId({
      userId: currentUser?._id,
    });
    if (
      currentUser?.role === "admin" ||
      (bootcampIdRes[0]?._id === course?.bootcamp?._id &&
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
            id={course?._id as string}
            bootcampId={course?.bootcamp?._id as string}
            title={course?.title as string}
            imageSrc={course?.image as string}
            currentUser={currentUser}
            locationValue={
              `${course?.bootcamp?.location?.city} ${course?.bootcamp?.location?.country}` ||
              course?.bootcamp?.location?.formattedAddress
            }
            course={true}
            canEditDelete={canEditDelete}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <div className="col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold flex flex-row justify-between items-center">
                <div className="flex gap-2">
                  Owner: {course?.user?.name}
                  <Avatar src={course?.user?.image} />
                  <div>
                    <span className="text-sm ms-1 bg-black text-white rounded-lg px-1">
                      {course?.minimumSkill}
                    </span>
                  </div>
                </div>
              </div>
              {course?.createdAt && (
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500 text-sm ">
                  <div>Created: {formatDate(course?.createdAt)}</div>
                </div>
              )}
              <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">$ {course?.tuition}</div>
                <div className="font-light text-xs">Cost</div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between ">
                <div className="flex flex-row justify-between p-1">
                  <div>
                    <span className="font-bold">Weeks</span> : {course?.weeks}
                  </div>
                </div>
                <div>
                  <span
                    className={`${
                      course?.scholarshipAvailable
                        ? `bg-green-500`
                        : `bg-red-500`
                    } rounded-md px-1 py-0 text-white font-semibold me-3`}
                  >
                    <span className="text-sm">{`${
                      course?.scholarshipAvailable
                        ? `Scholarship Available`
                        : `No Scholarship`
                    }`}</span>
                  </span>
                </div>
              </div>
            </div>

            <hr />
            <div>
              <span className="font-bold text-xl">Description</span>
            </div>
            <div className="text-lg font-light text-neutral-500">
              {course?.description}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CourseClient;
