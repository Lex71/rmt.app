import { useForm, type SubmitHandler } from "react-hook-form";
import type { TableForm } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TableFormProps {
  submit: (data: TableForm) => void;
}

export default function TableCreateForm({ submit }: TableFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TableForm>({
    defaultValues: {
      name: "",
      description: "",
      seats: 4,
    },
  });

  const onSubmit: SubmitHandler<TableForm> = (data) => {
    submit(data);
    formReset();
  };

  const formReset = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("seats", 0);
  };

  return (
    <form
      className="flex flex-wrap align-middle justify-center gap-4 space-y-6 px-4 py-6 sm:px-2"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shrink-0">
        <Input
          type="text"
          id="name"
          autoComplete="off"
          placeholder="name"
          tabIndex={1}
          {...register("name", {
            required: "Name is required",
          })}
          className="w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
          className="w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.description && (
          <div className="text-xs text-red-500">
            {errors.description.message}
          </div>
        )}
        {/* </div> */}
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
      <div className="shrink-0">
        <Button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 cursor-pointer"
          } grow justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
        >
          {isSubmitting ? "Submitting..." : "Create"}
        </Button>
      </div>
    </form>
  );
}
