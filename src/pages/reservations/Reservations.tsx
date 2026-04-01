import {
  /* type ChangeEvent, */ useEffect,
  useState,
  lazy,
  Suspense,
} from "react";
import { type Status, StatusEnum, type Reservation } from "@/types";
import { toast } from "sonner";
const Loading = lazy(() => import("@/components/Loading"));
const ReservationCreateForm = lazy(
  () => import("@/components/forms/ReservationCreateForm"),
);
import useReservations from "@/hooks/useReservations";

import { useQueryClient } from "@tanstack/react-query";
// import { ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

type ReservationForm = {
  name: string;
  phone: string;
  date: string;
  time: string;
  seats: number;
  tables: string[];
};

export default function Reservations() {
  const [today, setToday] = useState(new Date().toISOString().slice(0, 10));
  const qc = useQueryClient();

  const {
    data: reservations,
    isPending: isPendingReservations,
    add,
    pch,
  } = useReservations({ date: today });

  useEffect(() => {
    const fetchTodaysReservations = async () => {
      await qc.invalidateQueries({ queryKey: ["reservations", today] });
    };
    if (today !== undefined) {
      fetchTodaysReservations();
    }
  }, [qc, today]);

  const submit = (form: ReservationForm): void => {
    const body: Omit<Partial<Reservation>, "tables"> & {
      tables: string[];
    } = {
      ...form,
    };
    add.mutate(body);
    // try {
    //   add.mutate(body);
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Create reservation::failed", {
    //     description: (error as Error).message,
    //   });
    // }
  };

  // const handleActions = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
  //   const status = e.target.value as Status;
  //   const reservation = (reservations as Reservation[])?.find(
  //     (r) => r._id === id,
  //   );
  //   if (
  //     reservation &&
  //     ![StatusEnum.PAID.toString(), StatusEnum.CANCELLED].includes(
  //       reservation.status,
  //     )
  //   ) {
  //     pch.mutate({ id, data: { status } });
  //   } else {
  //     toast.error(`Cannot change status to ${status}`);
  //   }
  // };

  const handleStatusChange = (value: string, id: string) => {
    const reservation = (reservations as Reservation[])?.find(
      (r) => r._id === id,
    );
    if (
      reservation &&
      ![StatusEnum.PAID.toString(), StatusEnum.CANCELLED].includes(
        reservation.status,
      )
    ) {
      const status = value as Status;
      pch.mutate({ id, data: { status } });
    } else {
      toast.error(`Cannot change status to ${status}`);
    }
  };

  return (
    <>
      <div className="px-4 py-6 sm:px-2">
        <h1 className="text-2xl text-center font-semibold">
          Reservations: {today}
        </h1>
        <div className="sm:mx-auto sm:w-full">
          <Suspense fallback={<Loading />}>
            <ReservationCreateForm
              submit={submit}
              today={today}
              setToday={setToday}
            />
          </Suspense>
        </div>
        <div className="my-2">
          <div className="align-middle inline-block min-w-full">
            {!isPendingReservations && (
              <>
                <div className="w-full flex justify-center my-2  max-h-[40vh]">
                  <ScrollArea className="w-full rounded-md border max-h-[40vh]">
                    <Table>
                      <TableCaption>A list of your tables.</TableCaption>
                      <TableHeader className="sticky top-0 bg-background z-10 uppercase">
                        <TableRow>
                          <TableHead className="w-75">Customer</TableHead>
                          <TableHead className="w-50">
                            Date &amp; Time
                          </TableHead>
                          <TableHead className="w-75">Table (seats)</TableHead>
                          <TableHead className="w-50">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservations &&
                        Array.isArray(reservations) &&
                        reservations.length > 0 ? (
                          reservations.map((reservation) => (
                            <TableRow key={reservation._id}>
                              <TableCell className="font-medium">
                                <div className="text-sm font-medium">
                                  {reservation.name}
                                </div>
                                <div className="text-sm">
                                  {reservation.phone}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {reservation.date}
                                </div>
                                <div className="text-sm">
                                  {reservation.time}
                                </div>
                              </TableCell>
                              <TableCell>
                                {reservation.tables.map((table) => (
                                  <div
                                    className="flex flex-nowrap"
                                    key={table._id}
                                  >
                                    <span className="rounded-full px-3 py-1 text-sm font-semibold">
                                      {table.name} ({table.seats})
                                    </span>
                                    {/* <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-bold text-black mr-2 mb-2">
                                  Seats: {table.seats}
                                </span> */}
                                  </div>
                                ))}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${
                                reservation.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : reservation.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                                >
                                  {reservation.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div
                                  className="flex flex-nowrap justify-end"
                                  title={
                                    [
                                      StatusEnum.PAID.toString(),
                                      StatusEnum.CANCELLED.toString(),
                                    ].includes(reservation.status)
                                      ? "Cannot change the status"
                                      : "Change the status"
                                  }
                                >
                                  <Select
                                    value={reservation.status}
                                    onValueChange={(value) =>
                                      handleStatusChange(value, reservation._id)
                                    }
                                    disabled={[
                                      StatusEnum.PAID.toString(),
                                      StatusEnum.CANCELLED.toString(),
                                    ].includes(reservation.status)}
                                  >
                                    <SelectTrigger className="w-full max-w-48">
                                      <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        {Object.entries(StatusEnum).map(
                                          ([key, val]) => (
                                            <SelectItem value={val} key={key}>
                                              {key}
                                            </SelectItem>
                                          ),
                                        )}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  {/* {reservation.status === "pending" && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleUpdateStatus(
                                            reservation._id,
                                            "confirmed"
                                          )
                                        }
                                        className="text-green-600 hover:text-green-900 mr-4"
                                      >
                                        Confirm
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleUpdateStatus(
                                            reservation.id,
                                            "cancelled"
                                          )
                                        }
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        Cancel
                                      </button>
                                    </>
                                  )} */}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No reservations.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>

                {/* <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                      <tr>
                        <th
                          scope="col"
                          className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Table (seats)
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reservations &&
                      Array.isArray(reservations) &&
                      reservations.length > 0 ? (
                        reservations.map((reservation) => (
                          <tr key={reservation._id}>
                            <td className="px-2 py-2 whitespace-nowrap">
                              <div className="text-sm font-medium">
                                {reservation.name}
                              </div>
                              <div className="text-sm">{reservation.phone}</div>
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap">
                              <div className="text-sm">{reservation.date}</div>
                              <div className="text-sm">{reservation.time}</div>
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm">
                              {reservation.tables.map((table) => (
                                <div
                                  className="flex flex-nowrap"
                                  key={table._id}
                                >
                                  <span className="rounded-full px-3 py-1 text-sm font-semibold">
                                    {table.name} ({table.seats})
                                  </span>
                                </div>
                              ))}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap">
                              <Badge
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${
                                reservation.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : reservation.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                              >
                                {reservation.status}
                              </Badge>
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium">
                              <div
                                className="relative"
                                title={
                                  [
                                    StatusEnum.PAID.toString(),
                                    StatusEnum.CANCELLED.toString(),
                                  ].includes(reservation.status)
                                    ? "Cannot change the status"
                                    : "Change the status"
                                }
                              >
                                <Select
                                  value={reservation.status}
                                  onValueChange={(value) =>
                                    handleStatusChange(value, reservation._id)
                                  }
                                  disabled={[
                                    StatusEnum.PAID.toString(),
                                    StatusEnum.CANCELLED.toString(),
                                  ].includes(reservation.status)}
                                >
                                  <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Select a status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Status</SelectLabel>
                                      {Object.entries(StatusEnum).map(
                                        ([key, val]) => (
                                          <SelectItem value={val} key={key}>
                                            {key}
                                          </SelectItem>
                                        ),
                                      )}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-8">
                            No reservations found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div> */}
              </>
            )}
            {isPendingReservations && <Loading />}
          </div>
        </div>
      </div>
    </>
  );
}
