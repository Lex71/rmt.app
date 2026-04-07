import {
  useForm,
  // useController,
  // Controller,
  useWatch,
  type SubmitHandler,
  // Control,
} from "react-hook-form";
import { Link } from "react-router";
import type { ReservationForm, Table } from "@/types";
import {
  useState,
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  lazy,
  Suspense,
} from "react";

import { getReservableTables } from "@/services/urls/reservations";
import useDebounce from "@/hooks/useDebounce";
import { addTime } from "@/services/helpers";
import Loading from "@/components/Loading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
// import { Field, FieldError /* , FieldLabel */ } from "../ui/field";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { ChevronDownIcon } from "lucide-react";
// import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import DatePicker from "../DatePicker";
// import { CheckTable } from "../CheckTable";
const CheckTable = lazy(() => import("../CheckTable"));

interface ReservationFormProps {
  today: string;
  setToday: Dispatch<SetStateAction<string>>;
  submit: (data: ReservationForm) => void;
}

export default function ReservationCreateForm({
  submit,
  today,
  setToday,
}: ReservationFormProps) {
  const defaultTime = "18:30";
  const [tables, setTables] = useState<Table[]>([]);
  const [tablesBySeats, setTablesBySeats] = useState<Table[]>([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [adjust, setAdjust] = useState(0);
  const [adjustedTime, setAdjustedTime] = useState(defaultTime); // format(addTime(time, adjust);
  const adjustDebounced = useDebounce(adjust, 1000);

  const {
    control,
    register,
    getValues,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>({
    defaultValues: {
      name: "",
      phone: "",
      date: today,
      time: defaultTime,
      seats: 0,
      tables: [],
    },
  });

  const [filterBySeats, setFilterBySeats] = useState(true);
  const selectedTables = useWatch({ control, name: "tables" });

  // const dateWatch = watch("date", new Date().toISOString().split("T")[0]);
  const dateWatch = watch("date", format(new Date(), "yyyy-MM-dd"));
  const timeWatch = watch("time", "18:30");
  const seatsDebounced = useDebounce(getValues("seats"), 1000);

  useEffect(() => {
    const fetchAvailableTables = async (): Promise<void> => {
      if (
        !getValues("date") ||
        !getValues("time") ||
        (Number(getValues("seats")) == 0 && tables.length)
      )
        return;
      setLoadingTables(true);
      try {
        const response = await getReservableTables({
          date: getValues("date"),
          time: getValues("time"),
          adjust: adjustDebounced.toString(),
        });
        setTables(response);
        setTablesBySeats(
          response.filter((table) =>
            filterBySeats ? table.seats >= seatsDebounced : true,
          ),
        );
      } catch (error) {
        console.error("Error fetching available tables:", error);
      } finally {
        setLoadingTables(false);
      }
    };
    fetchAvailableTables();
  }, [adjustDebounced, timeWatch, dateWatch, getValues, seatsDebounced]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let adjustValue = 0;
    const t = getValues("time");
    switch (e.target.name) {
      case "adjust":
        adjustValue = e.target.value ? parseInt(e.target.value) : 0;
        setAdjust(adjustValue);
        setAdjustedTime(addTime(t, adjustValue));
        break;
      case "date":
        setToday(e.target.value);
        break;
      case "seats":
        // clears the CheckTable array
        setValue("tables", []);
        // filters the tables by seats
        setTablesBySeats(
          tables.filter((table) =>
            filterBySeats ? table.seats >= parseInt(e.target.value) : true,
          ),
        );
        break;
      case "time":
        setAdjustedTime(addTime(t, adjust));
        break;
      default:
        break;
    }
  };

  type CheckedState = boolean | "indeterminate"; // Radix UI internal type
  const handleCheckboxChange = (checked: CheckedState) => {
    // Handle indeterminate state if necessary...
    const isChecked =
      checked === true ||
      (typeof checked === "string" && checked !== "indeterminate");
    //... now is a boolean
    setFilterBySeats(isChecked);
    // clears the CheckTable array
    setValue("tables", []);
    // filters the tables by seats
    setTablesBySeats(
      tables.filter((table) =>
        isChecked ? table.seats >= getValues("seats") : true,
      ),
    );
  };

  const onSubmit: SubmitHandler<ReservationForm> = (data) => {
    if (Object.keys(errors).length > 0) {
      // There are validation errors, do not submit the form
      return;
    }
    submit({ ...data, time: adjustedTime });
    formReset();
  };

  const formReset = () => {
    setValue("seats", 0);
    setValue("name", "");
    setValue("tables", []);
    setValue("phone", "");
  };

  // popover
  // const [open, setOpen] = useState(false);
  // const handleOpenChange = (open: boolean) => {
  //   setOpen(open);
  // };

  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-2"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Activity mode={isVisible ? "visible" : "hidden"}>
        <MyComponent />
      </Activity> */}

      <div className="container m-auto grid grid-cols-1 sm:grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="tile col-span-1">
          {/*
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <div className="mt-2">
            <Input
              type="date"
              id="date"
              autoComplete="off"
              {...register("date", {
                required: "Date is required",
                onChange: handleInputChange,
              })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.date && (
              <div className="text-xs text-red-500">{errors.date.message}</div>
            )}
          </div>*/}
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <div className="mt-2">
            <DatePicker
              handleInputChange={(value) => {
                handleInputChange({
                  target: {
                    name: "date",
                    value: format(value, "yyyy-MM-dd"),
                  },
                } as ChangeEvent<HTMLInputElement>);
              }}
              control={control}
            />
            {/* <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.value}
                        className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        id="date"
                        aria-invalid={fieldState.invalid}
                        {...field}
                        onSelect={(value) => {
                          field.onChange(value);
                          if (value) {
                            console.log(format(value, "yyyy-MM-dd"));
                            setOpen(false);
                            field.onChange(format(value, "yyyy-MM-dd"));
                            handleInputChange({
                              target: {
                                name: "date",
                                value: format(value, "yyyy-MM-dd"),
                              },
                            } as ChangeEvent<HTMLInputElement>);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}
          </div>
        </div>
        <div className="tile col-span-1">
          <label htmlFor="time" className="block text-sm font-medium">
            Time
          </label>
          <div className="mt-2">
            <Input
              type="time"
              id="time"
              autoComplete="off"
              // onInput={handleInputChange}
              {...register("time", {
                required: "Time is required",
                onChange: handleInputChange,
              })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {/* errors will return when field validation fails  */}
            {errors.time && (
              <div className="text-xs text-red-500">{errors.time.message}</div>
            )}
          </div>
        </div>

        <div className="tile col-span-1">
          <label htmlFor="seats" className="block text-sm font-medium">
            Seats
          </label>
          <div className="mt-2">
            <Input
              type="number"
              id="seats"
              min="1"
              {...register("seats", {
                required: "Seats is required",
                onChange: handleInputChange,
              })}
              // onChange={handleInputChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {/* errors will return when field validation fails  */}
            {errors.seats && (
              <div className="text-xs text-red-500">{errors.seats.message}</div>
            )}
          </div>
        </div>

        <div className="tile col-span-1">
          <label htmlFor="adjust" className="block text-sm font-medium">
            Adjust
          </label>
          <div className="mt-2 flex">
            <Input
              type="number"
              name="adjust"
              id="adjust"
              pattern="-?[0-9]+"
              placeholder="delay in minutes"
              step="15"
              value={adjust || ""}
              onChange={handleInputChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {/* errors will return when field validation fails  */}
          </div>
        </div>
        <div className="tile col-span-1">
          <label htmlFor="adjust" className="block text-sm font-medium">
            {`${filterBySeats ? "Disable" : "Enable"} filter by seats`}
          </label>
          <div className="mt-2 flex">
            <Checkbox
              checked={filterBySeats}
              onCheckedChange={(checked) => {
                handleCheckboxChange(checked);
              }}
              name="filterBySeats"
              id="filterBySeats"
              value={adjust || ""}
              className="self-center"
            />
            <div className="text-sm font-medium self-center pl-2">{`${filterBySeats ? "Enabled" : "Disabled"}`}</div>
          </div>
        </div>

        <div className="col-span-full">
          {/* <label>Adjusted time</label> */}
          <div className="flex gap-4" id="adjusted-time">
            <span>Adjusted time</span>
            <span className="font-bold">{adjustedTime || timeWatch}</span>
          </div>
        </div>

        <div className="col-span-full">
          {/* <div className="block text-sm font-medium text-gray-700">Tables</div> */}
          <p className="block text-sm font-medium">Available Tables</p>
          <div className="mt-2 flex gap-4 flex-wrap min-h-30">
            {!loadingTables && tables.length > 0 && (
              <Suspense fallback={<Loading />}>
                {seatsDebounced == 0 && (
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="text-center border-2 border-dashed border-gray-300">
                      <p className="my-10 text-center text-lg/9 tracking-tight text-gray-600">
                        How many seats?
                      </p>
                    </div>
                  </div>
                )}
                {seatsDebounced > 0 &&
                  !loadingTables &&
                  tablesBySeats.length > 0 &&
                  tablesBySeats.reduce((acc, cur) => acc + cur.seats, 0) >=
                    seatsDebounced &&
                  tablesBySeats.map((table) => (
                    <CheckTable
                      key={table._id}
                      id={table._id}
                      item={table}
                      name="tables"
                      control={control}
                      value={table._id}
                      required={true}
                    />
                  ))}
                {seatsDebounced > 0 &&
                  !loadingTables &&
                  tablesBySeats.length === 0 && (
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <div className="text-center border-2 border-dashed border-gray-300">
                        <p className="my-10 text-center text-lg/9 tracking-tight text-gray-600">
                          No table found with at least {seatsDebounced} seats.
                          Try disabling the filter by seats
                        </p>
                      </div>
                    </div>
                  )}
                {seatsDebounced > 0 &&
                  !loadingTables &&
                  !filterBySeats &&
                  tablesBySeats.reduce((acc, cur) => acc + cur.seats, 0) <
                    seatsDebounced && (
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <div className="text-center border-2 border-dashed border-gray-300">
                        <p className="my-10 text-center text-lg/9 tracking-tight text-gray-600">
                          Not enough tables for {seatsDebounced} seats
                        </p>
                      </div>
                    </div>
                  )}
              </Suspense>
            )}
            {!loadingTables && tables.length === 0 && (
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="text-center border-2 border-dashed border-gray-300">
                  <p className="my-10 text-center text-lg/9 tracking-tight text-gray-600">
                    No tables found:{" "}
                    <Link
                      to="/tables"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      create
                    </Link>{" "}
                    one.
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* {!loadingTables && tables.length === 0 && <p>No tables found</p>} */}
          {/* {loadingTables && <Loading />} */}
        </div>

        <div className="col-span-full">
          <div className="flex gap-4" id="total-seats">
            <span>Total seats</span>
            <span className="font-bold">
              {selectedTables.reduce(
                (prev, curr) =>
                  prev + tables.find((t) => t._id === curr)!.seats,
                0,
              )}
            </span>
          </div>
        </div>

        {selectedTables.length > 0 && (
          <>
            <div className="tile col-span-1">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Customer Name
              </label>
              <Input
                type="text"
                id="name"
                autoComplete="off"
                {...register("name", { required: "Name is required" })}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <div className="text-xs text-red-500">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="tile col-span-1">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Customer Phone
              </label>
              <Input
                type="number"
                id="phone"
                autoComplete="off"
                {...register("phone", { required: "Phone is required" })}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {/* errors will return when field validation fails  */}
              {errors.phone && (
                <div className="text-xs text-red-500">
                  {errors.phone.message}
                </div>
              )}
            </div>
          </>
        )}
        <div className="tile col-span-1 self-end">
          <Button
            disabled={isSubmitting}
            type="submit"
            className={`${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600  cursor-pointer"
            } inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSubmitting ? "Submitting..." : "Create"}
          </Button>
          {errors.root && (
            <div className="text-xs text-red-500">{errors.root.message}</div>
          )}
        </div>
      </div>
    </form>
  );
}
