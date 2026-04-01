import { useState } from "react";
import { Link } from "react-router";
import { recoverPassword } from "../../services/urls/auth";
import { toast } from "sonner";
import { useForm, type SubmitHandler } from "react-hook-form";

export default function PasswordRecover() {
  const [submitted, setSubmitted] = useState<boolean | undefined>();

  type RecoverForm = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverForm>();
  const onSubmit: SubmitHandler<RecoverForm> = async (data) =>
    await submit(data);

  const submit = async ({ email }: RecoverForm) => {
    try {
      await recoverPassword({ email });
      setSubmitted(true);
      toast.success("Email success", {
        description: `Email sent to ${email}`,
      });
    } catch (error: unknown) {
      console.error(error);
      setSubmitted(false);
      toast.error("Email::failed", {
        description: (error as Error).message,
      });
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-xl/9 tracking-tight text-gray-600">
          Recover your password
        </p>
      </div>

      {submitted === true ? (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-lg/9 tracking-tight text-gray-600">
            If that account is in our system, we emailed you a link to reset
            your password.
          </p>
        </div>
      ) : (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mb-10 text-center  tracking-tight text-gray-600">
            It happens to the best of us. Enter your email and we'll send you
            reset instructions.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
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
                  <div className="text-xs text-red-500">
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send me an email
            </button>
          </form>
        </div>
      )}

      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center">
          <div className="text-sm">
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              to="/auth/login"
            >
              {submitted ? "Check your inbox!" : "Back to login"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
