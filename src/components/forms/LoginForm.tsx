import { useState } from "react";
import {
  useForm,
  type SubmitHandler /* , SubmitErrorHandler */,
} from "react-hook-form";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import type { SigninForm } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

interface LoginFormProps {
  submit: (data: SigninForm) => void;
}

export default function LoginForm({ submit }: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>();

  const onSubmit: SubmitHandler<SigninForm> = (data) => submit(data);

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
          <label htmlFor="password" className="block text-sm/6 font-medium">
            Password
          </label>
          <div className="text-sm">
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              to="/password/recover"
              tabIndex={5}
            >
              Forgot your password?
            </Link>
          </div>
        </div> */}
        <div className="mt-2 relative">
          {/* <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            tabIndex={2}
            {...register("password", {
              required: "Password is required",
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            variant="ghost"
          >
            {isPasswordVisible ? (
              <Eye size={20} className="text-gray-500" />
            ) : (
              <EyeOff size={20} className="text-gray-500" />
            )}
          </Button> */}
          <Field className="max-w-sm">
            <FieldLabel
              htmlFor="inline-end-input"
              className="flex items-center justify-between"
            >
              <div>Password</div>
              <div>
                <Link
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  to="/password/recover"
                  tabIndex={5}
                >
                  Forgot your password?
                </Link>
              </div>
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="inline-end-input"
                placeholder="Enter password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                tabIndex={3}
                {...register("password", {
                  required: "Password is required",
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
      <div className="mt-10 flex items-center justify-between gap-2">
        <Button
          className="grow rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          // className="grow text-indigo-600 hover:text-indigo-500"
          // variant="secondary"
          type="submit"
          tabIndex={3}
        >
          Login
        </Button>
        <div className="grow-0 text-sm">
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            to="/auth/register"
            tabIndex={4}
          >
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}
