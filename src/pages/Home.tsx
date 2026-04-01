// export const Home = () => {
//   return <div>Questa è la Home Page Provvisoria</div>;
// };
import { lazy, Suspense } from "react";
const FacilityList = lazy(() => import("@/components/FacilityList"));
import Loading from "@/components/Loading";

const TableList = lazy(() => import("@/components/TableList"));
import { useAuth } from "@/hooks/useAuth";
import useHome from "@/hooks/useHome";
import type { Facility, Table } from "@/types";

function Home() {
  const { user } = useAuth();
  const { data, isPending } = useHome();

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-center text-xl/9 tracking-tight">
          Welcome home, {user?.name}!
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        {user?.role === "admin" ? (
          <>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Recently added facilities
              </h2>
              {!isPending && data && (
                <FacilityList items={data as Facility[]} />
              )}
              {/* {isPending && <Loading />} */}
            </div>
          </>
        ) : (
          <>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Recently added tables
              </h2>
              {!isPending && data && <TableList items={data as Table[]} />}
              {/* {isPending && <Loading />} */}
            </div>
          </>
        )}
      </Suspense>
    </>
  );
}

export default Home;
