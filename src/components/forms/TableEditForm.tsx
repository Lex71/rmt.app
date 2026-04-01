import type { TableForm } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TableEditFormProps {
  _id: string;
  name: string;
  description?: string;
  seats: number;
  facility?: string;
  submit: (data: TableForm) => void;
}

export default function TableEditForm({
  submit,
  name,
  description,
  seats = 4,
}: TableEditFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TableForm>({
    defaultValues: {
      name,
      description,
      seats,
    },
  });

  const onSubmit: SubmitHandler<TableForm> = (data) => {
    submit(data);
    // formReset();
  };

  const formReset = () => {
    setValue("name", name);
    setValue("description", description ?? "");
    setValue("seats", seats);
  };

  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-2"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shrink-0">
        <Input
          type="text"
          id="name"
          autoComplete="off"
          placeholder="Name"
          tabIndex={1}
          {...register("name", {
            required: "Name is required",
          })}
          className="w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          // className="color-input w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          // className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.name && (
          <div className="text-xs text-red-500">{errors.name.message}</div>
        )}
      </div>

      <div className="shrink-0">
        <Input
          type="text"
          id="description"
          autoComplete="off"
          placeholder="description"
          tabIndex={2}
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.description && (
          <div className="text-xs text-red-500">
            {errors.description.message}
          </div>
        )}
      </div>

      <div className="shrink-0">
        <Input
          type="number"
          id="seats"
          min="1"
          placeholder="number of seats"
          tabIndex={3}
          {...register("seats", {
            required: "Seats is required",
          })}
          className="w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.seats && (
          <div className="text-xs text-red-500">{errors.seats.message}</div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 cursor-pointer"
          } inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isSubmitting ? "Submitting..." : "Update"}
        </Button>
        <Button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            cursor-pointer"
          onClick={() => formReset()}
        >
          Reset
        </Button>
        {errors.root && (
          <div className="text-xs text-red-500">{errors.root.message}</div>
        )}
      </div>
    </form>
  );
}
