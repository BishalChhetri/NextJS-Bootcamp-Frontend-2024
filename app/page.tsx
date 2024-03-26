import getCurrentUser from "./actions/getCurrentUser";
import getAllBootcamp from "./api/bootcamp/getAllbootcamp";
import BootcampCard from "./components/bootcamps/BootcampCard";
import Container from "./components/Container";
import { SafeBootcamp } from "./types";

const App = async function () {
  const bootcamps = await getAllBootcamp();
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <div className="pt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {bootcamps?.data.map((bootcamp: SafeBootcamp) => {
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
};

export default App;
export const dynamic = "force-dynamic";
