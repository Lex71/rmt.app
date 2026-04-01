import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

import { type SigninForm } from "@/types";
import { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
// import LoginForm from "../../components/forms/LoginForm";
// const Loading = lazy(() => import("../../components/Loading"));
const LoginForm = lazy(() => import("@/components/forms/LoginForm"));

export default function Login() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const submit = async ({ email, password }: SigninForm): Promise<void> => {
    try {
      await signin(email, password);
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Login::failed", {
        description: (error as Error).message,
      });
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-xl/9 tracking-tight text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense fallback={<Loading />}>
          <LoginForm submit={submit} />
        </Suspense>
      </div>
    </>
  );
}
