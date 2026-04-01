import type { FacilityForm } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FacilityEditFormProps {
  _id: string;
  name: string;
  address: string;
  submit: (data: FacilityForm) => void;
}

export default function FacilityEditForm({
  submit,
  name,
  address,
}: FacilityEditFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FacilityForm>({
    defaultValues: {
      name,
      address,
    },
  });
  const onSubmit: SubmitHandler<FacilityForm> = (data) => {
    submit(data);
  };

  const formReset = () => {
    setValue("name", name);
    setValue("address", address);
  };

  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-2"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shrink-0">
        {/* <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Name
        </label> */}
        {/* <div className="mt-2"> */}
        <Input
          type="text"
          id="name"
          autoComplete="off"
          placeholder="Name"
          tabIndex={1}
          {...register("name", {
            required: "Name is required",
            min: 3,
            max: 50,
          })}
          className="w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          // className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.name && (
          <div className="text-xs text-red-500">{errors.name.message}</div>
        )}
        {/* </div> */}
      </div>

      <div className="shrink-0">
        {/* <div className="flex items-center justify-between">
          <label
            htmlFor="address"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Address
          </label>
        </div> */}
        {/* <div className="mt-2"> */}
        <Input
          type="text"
          id="address"
          autoComplete="off"
          placeholder="Address"
          tabIndex={1}
          {...register("address", {
            required: "Address is required",
          })}
          className="w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          // className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {errors.address && (
          <div className="text-xs text-red-500">{errors.address.message}</div>
        )}
        {/* </div> */}
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
