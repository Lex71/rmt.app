import { useMemo, useState } from "react";
import type { Reservation, Table, TableForm, TableSearch } from "@/types";
import { getAll as getAllTables } from "@/services/urls/tables";
import { toast } from "sonner";
import TablesSearchForm from "@/components/forms/TablesSearchForm";
import TableCreateForm from "@/components/forms/TableCreateForm";
import { useQueryClient } from "@tanstack/react-query";
import useTables from "@/hooks/useTables";
import useReservations from "@/hooks/useReservations";
import DialogCancelConfirm from "@/components/DialogCancelConfirm";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Table as TableComponent,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Tables() {
  // Dialog
  const [open, setOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string>("");
  const navigate = useNavigate();

  const handleClose = (confirmed?: boolean) => {
    setOpen(false);
    if (confirmed && confirmId) {
      handleDelete(confirmId);
    }
  };

  const onDelete = (id: string) => {
    setConfirmId(id);
    setOpen(true);
  };

  const onEdit = (id: string) => {
    navigate(`/tables/${id}`);
  };

  const [isSearching, setIsSearching] = useState(false);

  const qc = useQueryClient();

  const { data: tables, isPending: isPendingTables, add, del } = useTables();

  const { data: reservations, isPending: isPendingReservations } =
    useReservations({ date: new Date().toISOString().slice(0, 10) });

  const reservedTables = useMemo(() => {
    return (reservations as Reservation[])
      ?.map((r) => r.tables)
      .reduce((acc, cur) => [...acc, ...cur], []);
  }, [reservations]);

  const searchTables = async ({ name, seats }: TableSearch) => {
    try {
      setIsSearching(true);
      // use this to combine tables data with reservation data
      const data = await getAllTables({ name, seats: seats?.toString() ?? "" });
      console.log("found tables", data.length);
      qc.setQueryData(["tables"], data);
    } catch (error) {
      console.error(error);
      toast.error("Register::failed", {
        description: (error as Error).message,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const submit = (form: TableForm): void => {
    const body: Partial<Table> = {
      ...form,
    };
    add.mutate(body);
    // try {
    //   add.mutate(body);
    //   // formReset();
    // } catch (error: unknown) {
    //   console.error(error);
    //   toast.error("Create facility::failed", {
    //     description: (error as Error).message,
    //   });
    // }
  };

  const handleDelete = (id: string): void => {
    del.mutate(id);
  };

  return (
    <>
      <DialogCancelConfirm
        title="Are you sure?"
        message="This action cannot be undone"
        open={open}
        onClose={handleClose}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl py-8 font-semibold">Tables Management</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-lg font-semibold ">Search</h2>
      </div>
      <div className="sm:mx-auto sm:w-full">
        <TablesSearchForm submit={searchTables} />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-lg font-semibold ">Add New</h2>
      </div>

      <div className="sm:mx-auto sm:w-full">
        <TableCreateForm submit={submit} />
      </div>

      {tables && Array.isArray(tables) && tables.length > 0 ? (
        <>
          <div className="my-2 sm:mx-6 lg:mx-8 max-h-[40vh]">
            <ScrollArea className="w-full rounded-md border max-h-[40vh]">
              <TableComponent>
                <TableCaption>A list of your tables.</TableCaption>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-75">Name</TableHead>
                    <TableHead className="w-10">Seats</TableHead>
                    <TableHead className="w-150">Description</TableHead>
                    <TableHead className="w-25">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isPendingTables &&
                    !isPendingReservations &&
                    !isSearching &&
                    tables.map((table) => (
                      <TableRow key={table._id}>
                        <TableCell className="font-medium">
                          {table.name}
                        </TableCell>
                        <TableCell /* className="text-right" */>
                          {table.seats}
                        </TableCell>
                        <TableCell>{table.description}</TableCell>
                        <TableCell>
                          {reservedTables &&
                          reservedTables.length > 0 &&
                          reservedTables.find((t) => t._id === table._id) ? (
                            <Badge variant="destructive">Today Reserved</Badge>
                          ) : (
                            <Badge
                              variant="ghost"
                              className="bg-custom-secondary"
                            >
                              Available
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-nowrap gap-1">
                            <Button
                              //             className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6
                              // font-semibold text-white shadow-xs hover:bg-indigo-500
                              // focus-visible:outline-2 focus-visible:outline-offset-2
                              // focus-visible:outline-indigo-600 cursor-pointer"
                              className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                              onClick={() => {
                                onEdit(table._id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              //           className="rounded-md bg-red-600 px-3 py-1.5 text-sm/6
                              // font-semibold text-white shadow-xs hover:bg-red-500
                              // focus-visible:outline-2 focus-visible:outline-offset-2
                              // focus-visible:outline-red-600 cursor-pointer"
                              onClick={() => onDelete(table._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </TableComponent>
            </ScrollArea>
          </div>
          {/* <div className="flex flex-col">
            <div className="my-2 overflow-x-auto sm:mx-6 lg:mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="max-h-[60vh] min-h-20 overflow-y-auto">
                  <table className="block md:table min-w-full divide-y divide-gray-200">
                    <thead className="block md:table-header-group sticky top-0">
                      <tr className="block md:table-row">
                        <th
                          scope="col"
                          className="block md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="block md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Seats
                        </th>
                        <th
                          scope="col"
                          className="block md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="block md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="block md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="block md:table-row-group divide-y divide-gray-200">
                      {!isPendingTables &&
                        !isPendingReservations &&
                        !isSearching &&
                        tables.map((table) => (
                          <tr key={table._id} className="block md:table-row">
                            <td className="block md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium ">
                              {table.name}
                            </td>
                            <td className="block md:table-cell px-6 py-4 whitespace-nowrap text-sm">
                              {table.seats}
                            </td>
                            <td className="block md:table-cell px-6 py-4 whitespace-wrap text-sm">
                              {table.description}
                            </td>
                            <td className="block md:table-cell px-6 py-4 whitespace-nowrap text-sm">
                              {reservedTables &&
                              reservedTables.length > 0 &&
                              reservedTables.find(
                                (t) => t._id === table._id,
                              ) ? (
                                // <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                //   Today Reserved
                                // </span>
                                <Badge variant="destructive">
                                  Today Reserved
                                </Badge>
                              ) : (
                                // <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                //   Available
                                // </span>
                                <Badge
                                  variant="ghost"
                                  className="bg-custom-secondary"
                                >
                                  Available
                                </Badge>
                              )}
                            </td>
                            <td className="block md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex flex-nowrap gap-1">
                                <button
                                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6
            font-semibold text-white shadow-xs hover:bg-indigo-500
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600 cursor-pointer"
                                  onClick={() => {
                                    onEdit(table._id);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="rounded-md bg-red-600 px-3 py-1.5 text-sm/6
              font-semibold text-white shadow-xs hover:bg-red-500
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-red-600 cursor-pointer"
                                  onClick={() => onDelete(table._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </>
      ) : (
        <div className="py-4 sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <p className="">No tables found</p>
        </div>
      )}
    </>
  );
}
