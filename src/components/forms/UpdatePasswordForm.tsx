import { useState } from "react";
import {
  useForm,
  type SubmitHandler /* , SubmitErrorHandler */,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { type ChangePasswordForm } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  /* FieldDescription, */ FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface UpdatePasswordProps {
  submit: (data: ChangePasswordForm) => void;
}

const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/,
);

export default function UpdatePasswordForm({ submit }: UpdatePasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function toggleNewPasswordVisibility() {
    setIsNewPasswordVisible((prevState) => !prevState);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    submit(data);
    formReset();
  };
  const formReset = () => {
    //  setValue("name", "");
    //  setValue("address", "");
    reset();
  };
  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-2"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm/6 font-medium">
          Email address
        </label>
        <div className="mt-2">
          <Input
            type="email"
            id="email"
            autoComplete="off"
            tabIndex={1}
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.email && (
            <div className="text-xs text-red-500">{errors.email.message}</div>
          )}
        </div>
      </div>

      <div className="mt-4">
        {/* <div className="flex items-center justify-between">
          <label
            htmlFor="currentPassword"
            className="block text-sm/6 font-medium"
          >
            Current Password
          </label>
        </div>
        <div className="mt-2 relative">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            tabIndex={2}
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            // className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            className="absolute inset-y-0 bg-transparent right-0  flex items-center text-sm leading-5"
            variant="ghost"
          >
            {isPasswordVisible ? (
              <Eye size={20} className="" />
            ) : (
              <EyeOff size={20} className="" />
            )}
          </Button>
        </div> */}
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-end-input">Current Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="inline-end-input"
              placeholder="Enter password"
              type={isPasswordVisible ? "text" : "password"}
              tabIndex={2}
              {...register("currentPassword", {
                required: "Current password is required",
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
        {errors.currentPassword && (
          <div className="text-xs text-red-500">
            {errors.currentPassword.message}
          </div>
        )}
      </div>
      <div className="mt-4">
        {/* <div className="flex items-center justify-between">
          <label htmlFor="newPassword" className="block text-sm/6 font-medium">
            New Password
          </label>
        </div>
        <div className="mt-2 relative">
          <Input
            type={isNewPasswordVisible ? "text" : "password"}
            id="newPassword"
            autoComplete="new-password"
            tabIndex={2}
            {...register("newPassword", {
              required: "New password is required",
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <Button
            type="button"
            onClick={toggleNewPasswordVisibility}
            // className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            className="absolute inset-y-0 bg-transparent right-0  flex items-center text-sm leading-5"
            variant="ghost"
          >
            {isNewPasswordVisible ? (
              <Eye size={20} className="" />
            ) : (
              <EyeOff size={20} className="" />
            )}
          </Button>
        </div> */}
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-end-input">New Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="inline-end-input"
              placeholder="Enter new password"
              type={isNewPasswordVisible ? "text" : "password"}
              tabIndex={3}
              {...register("newPassword", {
                required: "New password is required",
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
              onClick={toggleNewPasswordVisibility}
              tabIndex={8}
            >
              {isNewPasswordVisible ? (
                <Eye className="text-gray-500" />
              ) : (
                <EyeOff className="text-gray-500" />
              )}
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {errors.newPassword && (
          <div className="text-xs text-red-500">
            {errors.newPassword.message}
          </div>
        )}
      </div>
      <div className="mt-10 flex items-center justify-between gap-2">
        <Button
          type="submit"
          className="grow rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          tabIndex={3}
        >
          Change
        </Button>
        {/* <div className="grow-0 text-sm">
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            to="/auth/register"
            tabIndex={4}
          >
            Register
          </Link>
        </div> */}
      </div>
    </form>
  );
}
