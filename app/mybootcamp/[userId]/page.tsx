import getBootcampByUserId from "@/app/actions/getBootcampByUserId";
import getCurrentUser from "@/app/actions/getCurrentUser";
import BootcampClient from "@/app/bootcamps/[bootcampId]/BootcampClient";
import BootcampCard from "@/app/components/bootcamps/BootcampCard";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import { SafeBootcamp } from "@/app/types";

interface IParams {
  userId?: string;
}

const BootcampPage = async ({ params }: { params: IParams }) => {
  const bootcamps = await getBootcampByUserId({ userId: params?.userId });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser?._id !== params?.userId) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle={`${
          currentUser?._id !== params?.userId
            ? `This bootcamp is not associated with your account.`
            : `Please login`
        }`}
        showReset
      />
    );
  }

  if (bootcamps && bootcamps?.length === 0) {
    return (
      <EmptyState
        title="No bootcamp found"
        subtitle="Looks like you have not created bootcamp"
        label="Create bootcamp"
        showReset
      />
    );
  }

  if (bootcamps && bootcamps?.length > 1) {
    return (
      <Container>
        <div className="pt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {bootcamps?.map((bootcamp: SafeBootcamp) => {
            return (
              <BootcampCard
                key={bootcamp._id}
                data={bootcamp}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    );
  }

  return (
    <div>
      <BootcampClient
        bootcamp={bootcamps[0]}
        courses={bootcamps[0]?.courses}
        reviews={bootcamps[0]?.reviews}
        currentUser={currentUser}
      />
    </div>
  );
};

export default BootcampPage;
