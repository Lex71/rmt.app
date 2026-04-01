import { useAuth } from "@/hooks/useAuth";
import type { Facility, FacilityForm } from "@/types";
// import { toast } from "sonner";
import Loading from "@/components/Loading";
import FacilityList from "@/components/FacilityList";
import FacilityCreateForm from "@/components/forms/FacilityCreateForm";
import useFacilities from "@/hooks/useFacilities";

function Facilities() {
  const { user } = useAuth();
  const { data, isPending, add, del } = useFacilities();
  // REVIEW: shoul it really be async?
  const submit = (form: FacilityForm): void => {
    const body: Partial<Facility> = {
      ...form,
    };
    add.mutate(body);
    // try {
    //   add.mutate(body);
    // } catch (error: unknown) {
    //   console.error(error);
    //   toast.error("Create facility::failed", {
    //     description: (error as Error).message,
    //   });
    // }
  };
  return user?.role === "admin" ? (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl py-8 font-semibold">Facilities Management</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FacilityCreateForm submit={submit} />
      </div>

      <div className="space-y-6">
        {!isPending && data && (
          <FacilityList items={data as Facility[]} remove={del.mutate} />
        )}
        {isPending && <Loading />}
      </div>
    </>
  ) : (
    <div>You are not authorized to view this page</div>
  );
}

export default Facilities;
