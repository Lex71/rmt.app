import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// import { useApiGet } from "@/services/queryClient";
// import { getAll } from "@/services/urls/facilities";
import useFacilities from "@/hooks/useFacilities";
import type { Facility, SignupForm } from "@/types";
// import { useEffect } from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import Loading from "@/components/Loading";
// import { useState } from "react";

export default function Register() {
  // const navigate = useNavigate();
  const { signup } = useAuth();
  const { data, isError, error, isPending } = useFacilities();
  // const [registered, setRegistered] = useState(false);

  const submit = async ({
    name,
    email,
    password,
    passwordConfirm,
    facility,
  }: SignupForm): Promise<void> => {
    try {
      await signup(name, email, password, passwordConfirm, facility);
      // await navigate("/auth/login");
      // setRegistered(true);
      toast.success("Register::success", {
        description: `Successfully registered ${email}`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Register::failed", {
        description: (error as Error).message,
      });
    }
  };

  // load facilities for the form's select
  // const { data, isError, isPending, error } = useApiGet<Facility[], Error>(
  //   [],
  //   getAll
  // );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error("Facilities::error", {
  //       description: error.message ?? "getApi error.",
  //     });
  //   } else if (data) {
  //     toast.success("Facilities success", {
  //       description: `Found ${data.length} facilities`,
  //     });
  //   }
  // }, [isError, data, error]);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-xl/9 tracking-tight text-gray-600">
          Sign up a new account
        </p>
      </div>
      {isPending && <Loading />}
      {isError && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm relative top-[10vh]">
          <div className="text-center border-2 border-dashed border-gray-300">
            <div className="my-10 text-center text-lg/9 tracking-tight text-gray-600">
              <p>Error: {error?.message}</p>
              <p>Please try again later.</p>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="text-center">
                  <div className="text-sm">
                    <Link
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                      to="/auth/login"
                    >
                      Back to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {data &&
        Array.isArray(data) &&
        !isPending &&
        !isError &&
        data.length > 0 && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <RegisterForm submit={submit} facilities={data as Facility[]} />
          </div>
        )}
      {!isPending &&
        !isError &&
        data &&
        Array.isArray(data) &&
        data.length == 0 && (
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <p className="mt-10 text-center text-xl/9 tracking-tight text-gray-600">
                No Facilities Found. Cannot proceed with new users registration.
              </p>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="text-center">
                <div className="text-sm">
                  <Link
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    to="/auth/login"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      {/* {registered && (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="mt-10 text-center text-xl/9 tracking-tight text-gray-600">
              Registration successful
            </p>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="text-center">
              <div className="text-sm">
                <Link
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  to="/auth/login"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
