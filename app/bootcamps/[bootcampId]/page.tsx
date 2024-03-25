import getBootcampById from "@/app/actions/getBootcampById";
import getCoursesByBootcampId from "@/app/actions/getCoursesByBootcampId";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReviewsByBootcampId from "@/app/actions/getReviewsByBootcampId";
import EmptyState from "@/app/components/EmptyState";
import BootcampClient from "./BootcampClient";

interface IParams {
  bootcampId?: string;
}

const BootcampPage = async ({ params }: { params: IParams }) => {
  const bootcamp = await getBootcampById(params);
  const courses = await getCoursesByBootcampId(params);
  const reviews = await getReviewsByBootcampId(params);
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login" showReset />
    );
  }
  if (!bootcamp || bootcamp.length === 0) {
    return (
      <EmptyState
        title="No bootcamp found"
        subtitle="Looks like there is not such bootcamp"
        showReset
      />
    );
  }
  return (
    <div>
      <BootcampClient
        bootcamp={bootcamp}
        courses={courses}
        reviews={reviews}
        currentUser={currentUser}
      />
    </div>
  );
};

export default BootcampPage;
