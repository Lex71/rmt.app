import { useAuth } from "@/hooks/useAuth";
import type { Facility, FacilityForm } from "@/types";
// import { toast } from "sonner";
import FacilityEditForm from "@/components/forms/FacilityEditForm";
import useFacilities from "@/hooks/useFacilities";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function FacilityEdit() {
  const { user } = useAuth();
  const { id } = useParams();
  const { data, upd /* , isError, error */ } = useFacilities({ id });
  const navigate = useNavigate();
  const [item, setItem] = useState<Facility>(data as Facility);

  useEffect(() => {
    if (data) setItem(data as Facility);
  }, [data]);

  const submit = (form: FacilityForm): void => {
    const body: Partial<Facility> = {
      ...form,
    };
    if (!id) return;
    upd.mutate({ id, data: body });
    // try {
    //   if (!id) return;
    //   upd.mutate({ id, data: body });
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
        <h1 className="text-2xl py-8 font-semibold ">Facility Edit</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {item && <FacilityEditForm submit={submit} {...item} />}
      </div>
    </>
  ) : (
    <div className="text-center text-2xl">
      <p className="p-8">You are not authorized to view this page</p>
      <button
        className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-lg font-medium grow bg-indigo-600
            ext-white shadow-xs hover:bg-text-indigo-500
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-red-600 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </div>
  );
}

export default FacilityEdit;
