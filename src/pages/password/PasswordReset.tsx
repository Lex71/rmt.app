import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { resetPassword, validateResetToken } from "@/services/urls/auth";
import { toast } from "sonner";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useApiGet } from "@/services/queryClient";
import Loading from "@/components/Loading";
import type { User } from "@/types";

/* 
1. retrieve the userId and token from the URL
2. verify the token by send a GET request to api/forgot-password/:userId/:token
3. if request is successful, show the newPassword form ans submit to POST api/forgot-password/:userId/:token
 */

// url: http://localhost:5173/password/reset/684dc93a21a3bff46c69e328/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRkYzkzYTIxYTNiZmY0NmM2OWUzMjgiLCJpYXQiOjE3NDk5MzI3ODMsImV4cCI6MTc0OTkzNjM4M30.Kl5YU7nmFuHV1-zhikmDCnOAPM2hKniV5clf0GFebOk
export default function PasswordRecover() {
  const [completed, setCompleted] = useState<boolean | undefined>();
  const { userId, token } = useParams();

  type ResetForm = {
    password: string;
    passwordConfirm: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>();
  const onSubmit: SubmitHandler<ResetForm> = async (data) => await submit(data);

  const password = watch("password");
  const validatePasswordMatch = (value: string) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true;
  };

  // NOTE: this way it's called only once
  const { data, isPending, isError, error } = useApiGet<User, Error>([], () =>
    validateResetToken(userId ?? "", token ?? ""),
  );

  useEffect(() => {
    if (isError) {
      toast.error("Validation::failed", {
        description: (error as Error).message,
      });
    } else if (data) {
      toast.success("Validation successful", {
        description: `Token for ${data.email} is valid`, //data?.message ?? "Valid!",
      });
    }
  }, [isError, data, error, isPending]);

  // NOTE: this way it's called on every render
  // useEffect(() => {
  //   const validate = async () => {
  //     try {
  //       if (userId === undefined || token === undefined) {
  //         return false;
  //       }
  //       const response = await validateResetToken(userId, token); //await fetch(`/api/forgot-password/${userId}/${token}`);
  //       setValid(true);
  //       toast.success("Validation successful", {
  //         description: response?.message ?? "Valid!",
  //       });
  //     } catch (error) {
  //       console.error("Error verifying token:", error);
  //       toast.error("Validation error", {
  //         description: (error as Error)?.message ?? "Invalid.",
  //       });
  //     }
  //   };

  //   validate();
  // }, []);

  const submit = async ({ password, passwordConfirm }: ResetForm) => {
    try {
      const data = await resetPassword(userId ?? "", token ?? "", {
        password,
        passwordConfirm,
      });
      toast.success("Set new password", {
        description: `Successfully changed password for ${data.email}`,
      });
      setCompleted(true);
    } catch (error) {
      toast.error("Set new password::failed", {
        description: (error as Error)?.message,
      });
      setCompleted(false);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-xl/9 tracking-tight text-gray-600">
          {completed === true ? "Password changed" : "Set a new password"}
        </p>
      </div>
      {isPending && <Loading />}
      {!isPending && !isError && completed !== true && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && (
                  <div className="text-xs text-red-500">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
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
            <button
              type="submit"
              className="mt-10 w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Change password
            </button>
          </form>
        </div>
      )}
      {!isPending && isError && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center border-2 border-dashed border-gray-300">
            <p className="my-10 text-center text-lg/9 tracking-tight text-gray-600">
              {error.message ||
                "The link is not valid. Please request a new one and try again within 1 hour."}
            </p>
          </div>
          <div className="my-10 text-sm text-center">
            <Link
              to="/password/recover"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Back to forgot password
            </Link>
          </div>
        </div>
      )}
      {completed === true && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center">
            <div className="text-sm">
              <Link
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                to="/auth/login"
              >
                Login now!
              </Link>
            </div>
          </div>
        </div>
      )}
      {completed === false && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center border-2 border-dashed border-gray-300">
            <p className="my-10 text-center text-lg/9 tracking-tight text-gray-600">
              Something didn't work as expected. Please try again the recover
              procedure.
            </p>
          </div>
          <div className="my-10 text-sm text-center">
            <Link
              to="/password/recover"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Back to forgot password
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
