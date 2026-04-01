import { useApiGet, useApiSend } from "@/services/queryClient";
import { create, getAll, getOne, patch } from "@/services/urls/reservations";
import type { Reservation } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";

type FilterProps = {
  id?: string;
  date?: string;
};

/**
 * @description
 * A hook that handles CRUD operations for resevations.
 *
 * By default it fetches all reservations, but you can pass a filter object to
 * fetch a specific facility by id or filtered by date.
 *
 * @param {FilterProps} [filter] - Optional filter to apply to the query.
 * @returns {Object} - An object with the following properties:
 *  - data: The list of reservations or a single reservation if filter.id is provided.
 *  - isPending: A boolean indicating if the query is currently pending.
 *  - isError: A boolean indicating if the query resulted in an error.
 *  - error: The error object if the query resulted in an error.
 *  - refetch: A function to refetch the data.
 *  - add: A function to create a new reservation. It takes a reservation object as argument and returns the newly created reservation.
 *  - pch: A function to patch a reservation. It takes an object with the id of the reservation to update and the data to update as arguments.
 *        It returns the updated reservation.
 */
export default function useReservations(filter?: FilterProps) {
  const { data, isPending, isError, error, refetch } = useApiGet<
    Reservation[] | Reservation
  >(
    Object.keys(filter ?? {}).length > 0
      ? ["reservations", ...Object.values(filter ?? {})]
      : ["reservations"],
    (params) => (params?.id ? getOne(params.id) : getAll(params)),
    Object.keys(filter ?? {}).length > 0 ? { ...filter } : {},
  );

  useEffect(() => {
    if (isError) {
      toast.error("Reservations::failed", {
        description: (error as Error).message,
      });
    }
  }, [isError, error, data, isPending, filter, refetch]);

  // create
  const add = useApiSend<
    Reservation,
    Error,
    Omit<Partial<Reservation>, "tables"> & { tables: string[] }
  >(
    create,
    async (data) => {
      toast.success("Reservation created successfully");
      console.log("new data: ", data);
    },
    (error) => {
      toast.error("Create reservation::failed", {
        description: (error as Error).message,
      });
    },
    [{ queryKey: ["reservations"] }], // This will invalidate the reservations query
    {
      mutationKey: ["addReservation"],
    },
  );

  // update
  // const updateReservation = useApiSend<Reservation, Error, Partial<Reservation>>(
  //   update,
  //   async (data) => {
  //     toast.success("Reservation updated successfully");
  //     await qc.invalidateQueries({ queryKey: ["reservations"] });
  //     console.log(data);
  //   },
  //   (error) => {
  //     toast.error("Update reservation::failed", {
  //       // style: { backgroundColor: "lightcoral" },
  //       description: (error as Error).message,
  //       // duration: 5000,
  //       // position: "top-center",
  //     });
  //   }
  // );

  // delete
  // const deleteReservation = useApiSend<Reservation, Error, Partial<Reservation>>(
  //   remove,
  //   async (data) => {
  //     toast.success("Reservation deleted successfully");
  //     await qc.invalidateQueries({ queryKey: ["reservations"] });
  //     console.log(data);
  //   },
  //   (error) => {
  //     toast.error("Delete reservation::failed", {
  //       // style: { backgroundColor: "lightcoral" },
  //       description: (error as Error).message,
  //       // duration: 5000,
  //       // position: "top-center",
  //     });
  //   }
  // );

  // patch
  const pch = useApiSend<
    Reservation,
    Error,
    {
      id: string;
      data: Omit<Partial<Reservation>, "tables"> & { tables?: string[] };
    }
  >(
    async ({ id, data }) => await patch(id, data),
    async (data) => {
      toast.success("Reservation patched successfully");
      // await qc.invalidateQueries({ queryKey: ["reservations"] });
      // await qc.setQueryData(
      //   ["reservations"],
      //   (qc.getQueryData(["reservations"]) as Reservation[]).map((t) =>
      //     t._id !== data._id ? t : data
      //   )
      // );
      console.log("patched data: ", data);
    },
    (error) => {
      toast.error("Patch reservation::failed", {
        description: (error as Error).message,
        // duration: 5000,
      });
    },
    [{ queryKey: ["reservations"] }], // This will invalidate the reservations query
    {
      mutationKey: ["pchFacilitiy"],
    },
  );

  return {
    data,
    isPending,
    isError,
    error,
    refetch,
    add,
    pch,
  };
}
