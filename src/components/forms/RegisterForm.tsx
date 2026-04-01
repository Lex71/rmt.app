import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { /* type FormEvent, */ useState } from "react";

import { Eye, EyeOff /* , ChevronsUpDown */ } from "lucide-react";
import type { Facility, SignupForm } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  /* FieldDescription, */ FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegisterFormProps {
  submit: (data: SignupForm) => void;
  facilities: Facility[];
}

const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/,
);

export default function RegisterForm({
  submit,
  facilities,
}: RegisterFormProps) {
  // if Login throws an error, enable state
  // const [error, setError] = useState("");

  // CHECK these logs are logged 4 times:
  // first doubling is due to strictmode which doubles the renders in dev mode
  // second doubling could be de to useEffect w/o deps, but my useEffect has deps
  console.log("Facilities >>>>>>>>>>>>>>");
  facilities.map((option, index) => {
    console.log(index, option);
  });
  console.log("<<<<<<<<<<<<<<<");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>();

  const formReset = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
    setValue("passwordConfirm", "");
    // setValue("facility", "");
  };

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    submit(data);
    formReset();
  };

  const password = watch("password");
  const validatePasswordMatch = (value: string) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true;
  };

  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-2"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-4">
        <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          User name
        </label>
        <div className="mt-2">
          <Input
            type="text"
            id="name"
            autoComplete="off"
            tabIndex={1}
            {...register("name", { required: "Name is required" })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {/* errors will return when field validation fails  */}
          {errors.name && (
            <div className="text-xs text-red-500">{errors.name.message}</div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <Input
            type="email"
            id="email"
            autoComplete="off"
            tabIndex={2}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.email && (
            <div className="text-xs text-red-500">{errors.email.message}</div>
          )}{" "}
        </div>
      </div>

      <div className="mt-4">
        {/* <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password
        </label>
        <div className="mt-2 relative">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            tabIndex={3}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            tabIndex={8}
            variant="ghost"
          >
            {isPasswordVisible ? (
              <Eye size={20} className="text-gray-500" />
            ) : (
              <EyeOff size={20} className="text-gray-500" />
            )}
          </Button>
        </div> */}
        <div className="mt-2 relative">
          <Field className="max-w-sm">
            <FieldLabel htmlFor="inline-end-input">Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="inline-end-input"
                placeholder="Enter password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                tabIndex={3}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: PASSWORD_REGEX,
                    message:
                      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
                  },
                })}
              />
              <InputGroupAddon
                className="cursor-pointer"
                align="inline-end"
                onClick={togglePasswordVisibility}
                tabIndex={8}
              >
                {isPasswordVisible ? (
                  <Eye className="text-gray-500" />
                ) : (
                  <EyeOff className="text-gray-500" />
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
        {errors.password && (
          <div className="text-xs text-red-500">{errors.password.message}</div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Confirm Password
          </label>
        </div>
        <div className="mt-2">
          <Input
            type="password"
            id="passwordConfirm"
            tabIndex={4}
            {...register("passwordConfirm", {
              required: "Confirm password is required",
              validate: validatePasswordMatch,
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.passwordConfirm && (
            <div className="text-xs text-red-500">
              {errors.passwordConfirm.message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="facility"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Facility
        </label>

        <div className="mt-2">
          {/*<div className="relative">
               <select
                id="facility"
                tabIndex={5}
                {...register("facility", {
                  required: "Facility is required",
                })}
                // className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 appearance-none cursor-pointer"
              >
                {facilities.map((option, index) => (
                  <option key={index} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ChevronsUpDown
                size={20}
                className="text-gray-500 h-5 w-5 ml-1 absolute top-2 right-2.5"
              /> 
            </div>*/}
          <Controller
            name="facility"
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  // {...register("facility", {
                  //   required: "Facility is required",
                  // })}
                  // defaultValue={facilities[0]?._id}
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  required={true}
                >
                  <SelectTrigger
                    className="w-full max-w-48"
                    tabIndex={5}
                    aria-invalid={fieldState.invalid}
                    // className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Select a facility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Facility</SelectLabel>
                      {facilities.length &&
                        facilities.map((option, index) => (
                          <SelectItem value={option._id} key={index}>
                            {option.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          {errors.facility && (
            <div className="text-xs text-red-500">
              {errors.facility.message}
            </div>
          )}
        </div>
      </div>
      {/* </div> */}

      <div className="mt-10 flex items-center justify-between gap-2">
        <Button
          type="submit"
          className="grow justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          tabIndex={6}
        >
          Register
        </Button>
        <div className="grow-0 text-sm">
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            to="/auth/login"
            tabIndex={7}
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
