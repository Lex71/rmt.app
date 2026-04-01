import { useAuth } from "@/hooks/useAuth";
import type { Table, TableForm } from "@/types";
// import { toast } from "sonner";
import TableEditForm from "@/components/forms/TableEditForm";
import useTables from "@/hooks/useTables";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function TableEdit() {
  const { user } = useAuth();
  const { id } = useParams();
  const { data, upd } = useTables({ id });
  const navigate = useNavigate();
  const [item, setItem] = useState<Table>(data as Table);

  useEffect(() => {
    if (data) setItem(data as Table);
  }, [data]);

  const submit = (form: TableForm) => {
    const body: Partial<Table> = {
      ...form,
    };
    if (!id) return;
    upd.mutate({ id, data: body });
    // try {
    //   if (!id) return;
    //   upd.mutate({ id, data: body });
    // } catch (error: unknown) {
    //   console.error(error);
    //   toast.error("Create table:: submit failed", {
    //     description: (error as Error).message,
    //   });
    // }
  };

  return user?.role === "user" ? (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl py-8 font-semibold">Table Edit</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {item && <TableEditForm submit={submit} {...item} />}
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

export default TableEdit;
