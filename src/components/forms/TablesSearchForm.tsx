import { useForm, type SubmitHandler } from "react-hook-form";
import type { TableSearch } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TableSearchProps {
  submit: (data: TableSearch) => Promise<void>;
}

export default function TablesSearchForm({ submit }: TableSearchProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TableSearch>({
    defaultValues: {
      name: "",
      seats: 4,
    },
  });

  const onSubmit: SubmitHandler<TableSearch> = (data) => {
    submit(data);
    formReset();
  };

  const formReset = () => {
    setValue("name", "");
    setValue("seats", 4);
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
          placeholder="table name"
          {...register("name")}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.name && (
          <div className="text-xs text-red-500">{errors.name.message}</div>
        )}
      </div>

      <div className="shrink-0">
        <Input
          type="number"
          id="seats"
          min="1"
          placeholder="guests number"
          {...register("seats")}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.seats && (
          <div className="text-xs text-red-500">{errors.seats.message}</div>
        )}
      </div>

      <div className="shrink-0">
        <Button
          type="submit"
          className="grow justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
