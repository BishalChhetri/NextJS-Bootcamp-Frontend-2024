import getCourseById from "@/app/actions/getCourseById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import CourseClient from "./CourseClient";

interface IParams {
  courseId?: string;
}

const CoursePage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const course = await getCourseById(params);

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login" showReset />
    );
  }
  if (!course || course.length === 0) {
    return (
      <EmptyState
        title="No course found"
        subtitle="Looks like there is not such course"
        showReset
      />
    );
  }
  return (
    <div>
      <CourseClient course={course} currentUser={currentUser} />
    </div>
  );
};

export default CoursePage;
