import { useApiGet, useApiSend } from "@/services/queryClient";
import { create, getAll, getOne, remove, update } from "@/services/urls/tables";
import type { Table } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";

type FilterProps = {
  id?: string;
};

/**
 * @description
 * A hook that handles CRUD operations for tables.
 *
 * By default it fetches all tables, but you can pass a filter object to
 * fetch a specific facility by id.
 *
 * @param {FilterProps} [filter={}] - Filter options for the tables query.
 * @returns {Object} An object with the following properties:
 *  - `data`: The tables data, or undefined if the query is still pending.
 *  - `isPending`: Whether the query is still pending.
 *  - `isError`: Whether the query has failed.
 *  - `error`: The error message if the query has failed.
 *  - `add`: A function for creating a table.
 *  - `del`: A function for deleting a table.
 *  - `upd`: A function for updating a table.
 *  - `refetch`: A function for re-running the query.
 */
export default function useTables(filter?: FilterProps) {
  const { data, isPending, isError, error, refetch } = useApiGet<
    Table[] | Table,
    Error
  >(
    Object.keys(filter ?? {}).length > 0
      ? ["tables", ...Object.values(filter ?? {})]
      : ["tables"],
    (params) => (params?.id ? getOne(params.id) : getAll(params)),
    Object.keys(filter ?? {}).length > 0 ? { ...filter } : {},
  );

  useEffect(() => {
    if (isError) {
      toast.error("Tables::failed", {
        description: (error as Error).message,
      });
    }
  }, [isError, error, data, isPending, filter, refetch]);

  // create
  const add = useApiSend<Table, Error, Partial<Table>>(
    create,
    async (data) => {
      toast.success("Table created successfully");
      console.log("new data: ", data);
    },
    (error) => {
      toast.error("Create table:: add failed", {
        description: (error as Error).message,
      });
    },
    [{ queryKey: ["tables"] }], // This will invalidate the reservations query
    {
      mutationKey: ["addTable"],
    },
  );

  // delete
  const del = useApiSend<Table, Error, string>(
    remove,
    async (data) => {
      toast.success("Table deleted successfully");
      console.log("deleted data: ", data);
    },
    (error) => {
      toast.error("Delete table::failed", {
        description: (error as Error).message,
      });
    },
    [{ queryKey: ["tables"] }], // This will invalidate the reservations query
    {
      mutationKey: ["delTable"],
    },
  );

  // update
  const upd = useApiSend<Table, Error, { id: string; data: Partial<Table> }>(
    async ({ id, data }) => await update(id, data),
    async (data) => {
      toast.success("Table updated successfully");
      console.log("updated data: ", data);
    },
    (error) => {
      toast.error("Update table::failed", {
        description: (error as Error).message,
      });
    },
    [{ queryKey: ["tables"] }], // This will invalidate the reservations query
    {
      mutationKey: ["updTable"],
    },
  );

  return { data, isPending, isError, error, add, del, upd, refetch } as const;
}
