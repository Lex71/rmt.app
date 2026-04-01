import type { FacilityForm } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FacilityCreateFormProps {
  submit: (data: FacilityForm) => void;
}

export default function FacilityCreateForm({
  submit,
}: FacilityCreateFormProps) {
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FacilityForm>();
  const onSubmit: SubmitHandler<FacilityForm> = (data) => {
    submit(data);
    formReset();
  };

  const formReset = () => {
    setValue("name", "");
    setValue("address", "");
  };

  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-2"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Name
        </label>
        <div className="mt-2">
          <Input
            type="text"
            id="Name"
            autoComplete="off"
            tabIndex={1}
            {...register("name", {
              required: "Name is required",
              min: 3,
              max: 50,
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.name && (
            <div className="text-xs text-red-500">{errors.name.message}</div>
          )}
        </div>
      </div>

      <div className="">
        <div className="flex items-center justify-between">
          <label
            htmlFor="address"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Address
          </label>
        </div>
        <div className="mt-2">
          <Input
            type="text"
            id="address"
            autoComplete="off"
            tabIndex={1}
            {...register("address", {
              required: "Address is required",
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.address && (
            <div className="text-xs text-red-500">{errors.address.message}</div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 cursor-pointer"
          } mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isSubmitting ? "Submitting..." : "Create"}
        </Button>
        {errors.root && (
          <div className="text-xs text-red-500">{errors.root.message}</div>
        )}
      </div>
    </form>
  );
}
