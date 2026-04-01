import { useApiGet, useApiSend } from "@/services/queryClient";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "@/services/urls/facilities";
import { type Facility } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

type FilterProps = {
  id?: string;
};

/**
 * @description
 * A hook that handles CRUD operations for facilities.
 *
 * By default it fetches all facilities, but you can pass a filter object to
 * fetch a specific facility by id.
 *
 * @param {FilterProps} filter - An object with an optional id property.
 * @returns {Object}An object with the following properties:
 *   - `data`: An array of facilities or a single facility if the id filter is used.
 *   - `isPending`: A boolean indicating if the data is still being fetched.
 *   - `isError`: A boolean indicating if there was an error fetching the data.
 *   - `error`: An error object if there was an error fetching the data.
 *   - `add`: A function to create a new facility.
 *   - `del`: A function to delete a facility.
 *   - `upd`: A function to update a facility.
 *   - `refetch`: A function to refetch the facilities.
 */
export default function useFacilities(filter?: FilterProps) {
  const qc = useQueryClient();

  const { data, isPending, isError, error, refetch } = useApiGet<
    Facility[] | Facility
  >(
    Object.keys(filter ?? {}).length > 0
      ? ["facilities", ...Object.values(filter ?? {})]
      : ["facilities"],
    (params) => (params?.id ? getOne(params.id) : getAll(params)),
    Object.keys(filter ?? {}).length > 0 ? { ...filter } : {},
  );

  useEffect(() => {
    if (isError) {
      toast.error("Facilities::failed", {
        description: (error as Error).message,
      });
    }
  }, [isError, data, error, isPending, filter, refetch]);

  // create
  const add = useApiSend<Facility, Error, Partial<Facility>>(
    create,
    async (data) => {
      toast.success("Facility created successfully");
      console.log("new data: ", data);
    },
    (error) => {
      toast.error("Create facility::failed", {
        description: (error as Error).message,
      });
    },
    [{ queryKey: ["facilities"] }], // This will invalidate the query
    {
      mutationKey: ["addFacility"],
    },
  );

  // delete
  const del = useApiSend<Facility, Error, string>(
    remove,
    async (data) => {
      toast.success("Facility deleted successfully");
      console.log("deleted data: ", data);
    },
    (error) => {
      toast.error("Delete facility::failed", {
        description: (error as Error).message,
      });
    },
    [{ queryKey: ["facilities"] }], // This will invalidate the reservations query
    {
      mutationKey: ["delFacility"],
    },
  );

  // update
  const upd = useApiSend<
    Facility,
    Error,
    { id: string; data: Partial<Facility> }
  >(
    async ({ id, data }) => await update(id, data),
    async (data) => {
      toast.success("Facility updated successfully");
      console.log(data);
      qc.invalidateQueries({ queryKey: ["home"] });
    },
    (error) => {
      toast.error("Update facility::failed", {
        description: (error as Error).message,
      });
    },
    [{ queryKey: ["facilities"] }], // This will invalidate the reservations query
    {
      mutationKey: ["updFacilitiy"],
    },
  );

  return { data, isPending, isError, error, add, del, upd, refetch } as const;
}
